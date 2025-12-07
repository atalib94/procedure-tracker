'use client'

import { useState, useMemo } from 'react'
import { Plus, Search, ArrowUp, ArrowDown, Filter, Download, FileSpreadsheet, X, Loader2, RefreshCw, Archive, ArchiveRestore, FolderOpen, CheckSquare, Square, Trash2, AlertTriangle, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProcedureCard from '@/components/ProcedureCard'
import StatsCards from '@/components/StatsCards'
import HIPAANotice from '@/components/HIPAANotice'
import { createClient } from '@/lib/supabase-client'

interface DashboardClientProps {
  procedures: any[]
  totalProcedures: number
  asFirstOperator: number
  medicalCentres: number
  categoriesUsed: number
  categories: { id: string; name: string; code: string }[]
  medicalCentresList: { id: string; name: string }[]
  environmentId: string | null
}

type SortField = 'procedure_date' | 'procedure_name' | 'created_at'
type SortDirection = 'asc' | 'desc'
type ViewMode = 'active' | 'archived' | 'complicated'

export default function DashboardClient({
  procedures: initialProcedures,
  totalProcedures,
  asFirstOperator,
  medicalCentres,
  categoriesUsed,
  categories,
  medicalCentresList,
  environmentId,
}: DashboardClientProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [procedures, setProcedures] = useState(initialProcedures)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('procedure_date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [exportDateFrom, setExportDateFrom] = useState('')
  const [exportDateTo, setExportDateTo] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('active')
  
  // Multi-select state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [bulkActionLoading, setBulkActionLoading] = useState(false)

  // Import state
  const [showImportModal, setShowImportModal] = useState(false)
  const [importLoading, setImportLoading] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [importPreview, setImportPreview] = useState<any[]>([])
  const [importError, setImportError] = useState<string | null>(null)
  const [importSuccess, setImportSuccess] = useState<number>(0)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const handleArchiveToggle = async (id: string, archived: boolean) => {
    const { error } = await supabase
      .from('procedures')
      .update({ archived })
      .eq('id', id)

    if (!error) {
      setProcedures(prev => 
        prev.map(p => p.id === id ? { ...p, archived } : p)
      )
    }
  }

  const handleBulkArchive = async (archive: boolean) => {
    if (selectedIds.size === 0) return
    
    setBulkActionLoading(true)
    
    const { error } = await supabase
      .from('procedures')
      .update({ archived: archive })
      .in('id', Array.from(selectedIds))

    if (!error) {
      setProcedures(prev => 
        prev.map(p => selectedIds.has(p.id) ? { ...p, archived: archive } : p)
      )
      setSelectedIds(new Set())
      setIsSelectionMode(false)
    }
    
    setBulkActionLoading(false)
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    
    const confirmMessage = `Are you sure you want to delete ${selectedIds.size} procedure${selectedIds.size > 1 ? 's' : ''}? This action cannot be undone.`
    if (!confirm(confirmMessage)) return
    
    setBulkActionLoading(true)
    
    const { error } = await supabase
      .from('procedures')
      .delete()
      .in('id', Array.from(selectedIds))

    if (!error) {
      setProcedures(prev => prev.filter(p => !selectedIds.has(p.id)))
      setSelectedIds(new Set())
      setIsSelectionMode(false)
    }
    
    setBulkActionLoading(false)
  }

  // Download import template
  const handleDownloadTemplate = () => {
    const headers = [
      'imported_id',
      'procedure_date',
      'procedure_name',
      'operator_role',
      'other_operator_name',
      'medical_centre',
      'category',
      'accession_number',
      'is_complicated',
      'complication_type',
      'complication_severity',
      'complication_timing',
      'complication_description',
      'complication_management',
      'complication_outcome',
      'lessons_learned',
      'notes'
    ]
    
    // Create example rows
    const exampleRows = [
      [
        'IMP-001',
        '2024-01-15',
        'TACE for HCC',
        '1st Operator',
        'Dr. Smith',
        medicalCentresList[0]?.name || 'Hospital Name',
        categories[0]?.name || 'Category Name',
        'ACC-12345',
        'false',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'Successful procedure'
      ],
      [
        'IMP-002',
        '2024-01-20',
        'UFE',
        '2nd Operator',
        'Dr. Johnson',
        medicalCentresList[0]?.name || 'Hospital Name',
        categories[1]?.name || 'Category Name',
        'ACC-12346',
        'true',
        'Bleeding / Hemorrhage',
        'minor',
        'early',
        'Minor groin hematoma',
        'Compression applied',
        'Resolved without intervention',
        'Monitor access site closely',
        'Patient discharged next day'
      ]
    ]
    
    const csvContent = [
      headers.join(','),
      ...exampleRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'procedure_import_template.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  // Parse CSV file
  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim())
    if (lines.length < 2) return []
    
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
    const rows: any[] = []
    
    for (let i = 1; i < lines.length; i++) {
      const values: string[] = []
      let current = ''
      let inQuotes = false
      
      for (const char of lines[i]) {
        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      values.push(current.trim())
      
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      rows.push(row)
    }
    
    return rows
  }

  // Handle file selection
  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setImportFile(file)
    setImportError(null)
    setImportSuccess(0)
    
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const parsed = parseCSV(text)
        setImportPreview(parsed.slice(0, 5)) // Preview first 5 rows
      } catch (err) {
        setImportError('Failed to parse CSV file')
        setImportPreview([])
      }
    }
    reader.readAsText(file)
  }

  // Handle import
  const handleImport = async () => {
    if (!importFile) return
    
    setImportLoading(true)
    setImportError(null)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setImportError('You must be logged in to import procedures')
        setImportLoading(false)
        return
      }

      const reader = new FileReader()
      reader.onload = async (event) => {
        try {
          const text = event.target?.result as string
          const rows = parseCSV(text)
          
          if (rows.length === 0) {
            setImportError('No valid data found in the file')
            setImportLoading(false)
            return
          }

          let successCount = 0
          const errors: string[] = []

          for (const row of rows) {
            // Skip empty rows
            if (!row.procedure_name && !row.procedure_date) continue
            
            // Find matching medical centre
            const matchedCentre = medicalCentresList.find(
              mc => mc.name.toLowerCase() === (row.medical_centre || '').toLowerCase()
            )
            
            // Find matching category
            const matchedCategory = categories.find(
              cat => cat.name.toLowerCase() === (row.category || '').toLowerCase()
            )

            // Generate imported ID
            const importedId = row.imported_id?.startsWith('IMP-') 
              ? row.imported_id 
              : `IMP-${row.imported_id || Date.now()}-${Math.random().toString(36).substring(7)}`

            const procedureData = {
              user_id: session.user.id,
              environment_id: environmentId,
              procedure_name: row.procedure_name || 'Imported Procedure',
              procedure_date: row.procedure_date || new Date().toISOString().split('T')[0],
              operator_role: row.operator_role || '1st Operator',
              medical_centre_id: matchedCentre?.id || null,
              ebir_category_id: matchedCategory?.id || null,
              accession_number: importedId, // Use imported ID as accession number
              notes: [
                row.notes,
                row.other_operator_name ? `Other operator: ${row.other_operator_name}` : '',
                `[Imported: ${importedId}]`
              ].filter(Boolean).join('\n'),
              archived: true, // Imported cases go to archive
              is_complicated: row.is_complicated?.toLowerCase() === 'true',
              complication_type: row.complication_type || null,
              complication_severity: row.complication_severity || null,
              complication_timing: row.complication_timing || null,
              complication_description: row.complication_description || null,
              complication_management: row.complication_management || null,
              complication_outcome: row.complication_outcome || null,
              lessons_learned: row.lessons_learned || null,
            }

            const { error } = await supabase
              .from('procedures')
              .insert(procedureData)

            if (error) {
              errors.push(`Row ${row.imported_id || 'unknown'}: ${error.message}`)
            } else {
              successCount++
            }
          }

          setImportSuccess(successCount)
          
          if (errors.length > 0) {
            setImportError(`Imported ${successCount} procedures. ${errors.length} failed: ${errors.slice(0, 3).join('; ')}${errors.length > 3 ? '...' : ''}`)
          }
          
          if (successCount > 0) {
            router.refresh()
          }
        } catch (err: any) {
          setImportError(err.message || 'Import failed')
        } finally {
          setImportLoading(false)
        }
      }
      reader.readAsText(importFile)
    } catch (err: any) {
      setImportError(err.message || 'Import failed')
      setImportLoading(false)
    }
  }

  const resetImportModal = () => {
    setShowImportModal(false)
    setImportFile(null)
    setImportPreview([])
    setImportError(null)
    setImportSuccess(0)
  }

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectAll = () => {
    const allVisibleIds = filteredAndSortedProcedures.map(p => p.id)
    setSelectedIds(new Set(allVisibleIds))
  }

  const unselectAll = () => {
    setSelectedIds(new Set())
  }

  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      setSelectedIds(new Set())
    }
    setIsSelectionMode(!isSelectionMode)
  }

  const categories = useMemo(() => {
    const cats = new Set<string>()
    procedures.forEach(p => {
      if (p.ebir_categories?.name) {
        cats.add(p.ebir_categories.name)
      }
    })
    return Array.from(cats).sort()
  }, [procedures])

  const archiveCounts = useMemo(() => {
    const archived = procedures.filter(p => p.archived).length
    const active = procedures.filter(p => !p.archived).length
    const complicated = procedures.filter(p => p.is_complicated && !p.archived).length
    return { archived, active, complicated }
  }, [procedures])

  const complicationStats = useMemo(() => {
    const complicatedCases = procedures.filter(p => p.is_complicated && !p.archived)
    
    // Count by type
    const byType: { [key: string]: number } = {}
    complicatedCases.forEach(p => {
      if (p.complication_type) {
        byType[p.complication_type] = (byType[p.complication_type] || 0) + 1
      }
    })
    
    // Count by severity
    const bySeverity: { [key: string]: number } = {}
    complicatedCases.forEach(p => {
      if (p.complication_severity) {
        bySeverity[p.complication_severity] = (bySeverity[p.complication_severity] || 0) + 1
      }
    })
    
    // Count by timing
    const byTiming: { [key: string]: number } = {}
    complicatedCases.forEach(p => {
      if (p.complication_timing) {
        byTiming[p.complication_timing] = (byTiming[p.complication_timing] || 0) + 1
      }
    })
    
    // Complication rate
    const totalActive = procedures.filter(p => !p.archived).length
    const rate = totalActive > 0 ? ((complicatedCases.length / totalActive) * 100).toFixed(1) : '0'
    
    return { byType, bySeverity, byTiming, rate, total: complicatedCases.length }
  }, [procedures])

  const filteredAndSortedProcedures = useMemo(() => {
    let filtered = procedures.filter(p => {
      let matchesViewMode = false
      if (viewMode === 'archived') {
        matchesViewMode = p.archived
      } else if (viewMode === 'complicated') {
        matchesViewMode = p.is_complicated && !p.archived
      } else {
        matchesViewMode = !p.archived
      }
      
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery || 
        p.procedure_name?.toLowerCase().includes(searchLower) ||
        p.notes?.toLowerCase().includes(searchLower) ||
        p.accession_number?.toLowerCase().includes(searchLower) ||
        p.ebir_categories?.name?.toLowerCase().includes(searchLower) ||
        p.medical_centres?.name?.toLowerCase().includes(searchLower) ||
        p.complication_type?.toLowerCase().includes(searchLower) ||
        p.complication_description?.toLowerCase().includes(searchLower)
      
      const matchesCategory = !categoryFilter || p.ebir_categories?.name === categoryFilter
      
      return matchesViewMode && matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortField) {
        case 'procedure_date':
          comparison = new Date(a.procedure_date).getTime() - new Date(b.procedure_date).getTime()
          break
        case 'procedure_name':
          comparison = (a.procedure_name || '').localeCompare(b.procedure_name || '')
          break
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          break
      }
      
      return sortDirection === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [procedures, searchQuery, sortField, sortDirection, categoryFilter, viewMode])

  const allSelected = filteredAndSortedProcedures.length > 0 && 
    filteredAndSortedProcedures.every(p => selectedIds.has(p.id))

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection(field === 'procedure_name' ? 'asc' : 'desc')
    }
  }

  const sortOptions = [
    { value: 'procedure_date', label: 'Date' },
    { value: 'procedure_name', label: 'Name' },
    { value: 'created_at', label: 'Added' },
  ]

  const handleExport = (format: 'csv' | 'ebir') => {
    setExportLoading(true)
    
    try {
      let dataToExport = procedures.filter(p => !p.archived)
      
      if (exportDateFrom) {
        dataToExport = dataToExport.filter(p => p.procedure_date >= exportDateFrom)
      }
      if (exportDateTo) {
        dataToExport = dataToExport.filter(p => p.procedure_date <= exportDateTo)
      }

      dataToExport.sort((a, b) => new Date(a.procedure_date).getTime() - new Date(b.procedure_date).getTime())

      let csvContent = ''
      let filename = ''

      if (format === 'ebir') {
        const headers = ['Date', 'EBIR Category Code', 'EBIR Category', 'Procedure Name', 'Role', 'Medical Centre', 'Case ID', 'Notes']
        csvContent = headers.join(';') + '\n'
        
        dataToExport.forEach(p => {
          const row = [
            p.procedure_date,
            p.ebir_categories?.code || '',
            p.ebir_categories?.name || '',
            p.procedure_name || '',
            p.operator_role || '',
            p.medical_centres?.name || '',
            p.accession_number || '',
            (p.notes || '').replace(/;/g, ',').replace(/\n/g, ' ')
          ]
          csvContent += row.join(';') + '\n'
        })
        
        filename = `EBIR_Logbook_${new Date().toISOString().split('T')[0]}.csv`
      } else {
        const headers = ['Date', 'Procedure Name', 'Category', 'Category Code', 'Operator Role', 'Medical Centre', 'Case ID', 'Notes', 'Created At']
        csvContent = headers.join(',') + '\n'
        
        dataToExport.forEach(p => {
          const row = [
            p.procedure_date,
            `"${(p.procedure_name || '').replace(/"/g, '""')}"`,
            `"${(p.ebir_categories?.name || '').replace(/"/g, '""')}"`,
            p.ebir_categories?.code || '',
            p.operator_role || '',
            `"${(p.medical_centres?.name || '').replace(/"/g, '""')}"`,
            p.accession_number || '',
            `"${(p.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
            p.created_at?.split('T')[0] || ''
          ]
          csvContent += row.join(',') + '\n'
        })
        
        filename = `Procedures_Export_${new Date().toISOString().split('T')[0]}.csv`
      }

      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()
      URL.revokeObjectURL(link.href)
      
      setShowExportModal(false)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setExportLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <HIPAANotice />

      <StatsCards
        totalProcedures={totalProcedures}
        asFirstOperator={asFirstOperator}
        medicalCentres={medicalCentres}
        categoriesUsed={categoriesUsed}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('active')}
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${
                    viewMode === 'active'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  Active
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    viewMode === 'active' ? 'bg-purple-500' : 'bg-gray-200'
                  }`}>
                    {archiveCounts.active}
                  </span>
                </button>
                <button
                  onClick={() => setViewMode('complicated')}
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors border-l border-gray-300 ${
                    viewMode === 'complicated'
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Complicated
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    viewMode === 'complicated' ? 'bg-amber-400' : 'bg-gray-200'
                  }`}>
                    {archiveCounts.complicated}
                  </span>
                </button>
                <button
                  onClick={() => setViewMode('archived')}
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors border-l border-gray-300 ${
                    viewMode === 'archived'
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Archive className="w-4 h-4" />
                  Archived
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    viewMode === 'archived' ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    {archiveCounts.archived}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSelectionMode}
                className={`p-2 rounded-lg transition-colors ${
                  isSelectionMode 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
                title={isSelectionMode ? "Exit selection mode" : "Select multiple"}
              >
                <CheckSquare className="w-5 h-5" />
              </button>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={() => setShowExportModal(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowImportModal(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Import"
              >
                <Upload className="w-5 h-5" />
              </button>

              <Link
                href="/dashboard/procedures/new"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Procedure</span>
              </Link>
            </div>
          </div>

          {isSelectionMode && (
            <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={allSelected ? unselectAll : selectAll}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    {allSelected ? (
                      <>
                        <Square className="w-4 h-4" />
                        Unselect All
                      </>
                    ) : (
                      <>
                        <CheckSquare className="w-4 h-4" />
                        Select All ({filteredAndSortedProcedures.length})
                      </>
                    )}
                  </button>
                  
                  {selectedIds.size > 0 && (
                    <span className="text-sm text-purple-600 font-medium">
                      {selectedIds.size} selected
                    </span>
                  )}
                </div>

                {selectedIds.size > 0 && (
                  <div className="flex items-center gap-2">
                    {viewMode === 'active' ? (
                      <button
                        onClick={() => handleBulkArchive(true)}
                        disabled={bulkActionLoading}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        {bulkActionLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Archive className="w-4 h-4" />
                        )}
                        Archive Selected
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBulkArchive(false)}
                        disabled={bulkActionLoading}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {bulkActionLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ArchiveRestore className="w-4 h-4" />
                        )}
                        Restore Selected
                      </button>
                    )}
                    
                    <button
                      onClick={handleBulkDelete}
                      disabled={bulkActionLoading}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {bulkActionLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search procedures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Filter className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                <select
                  value={sortField}
                  onChange={(e) => handleSort(e.target.value as SortField)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  {sortDirection === 'asc' ? (
                    <ArrowUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-600">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {categoryFilter && (
                  <button
                    onClick={() => setCategoryFilter('')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {(searchQuery || categoryFilter) && (
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
            {filteredAndSortedProcedures.length} procedure{filteredAndSortedProcedures.length !== 1 ? 's' : ''} found
            {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
            {categoryFilter && <span> in {categoryFilter}</span>}
          </div>
        )}

        {viewMode === 'archived' && archiveCounts.archived > 0 && !isSelectionMode && (
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-600">
            <Archive className="w-4 h-4" />
            <span>Showing archived procedures. Click <ArchiveRestore className="w-4 h-4 inline" /> to restore.</span>
          </div>
        )}

        {/* Complications Statistics Panel */}
        {viewMode === 'complicated' && (
          <div className="px-4 py-4 bg-amber-50 border-b border-amber-200">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-900">Complication Overview</h3>
              <span className="ml-auto text-sm text-amber-700">
                Rate: {complicationStats.rate}% ({complicationStats.total} of {archiveCounts.active + archiveCounts.complicated} procedures)
              </span>
            </div>
            
            {complicationStats.total > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* By Severity */}
                <div className="bg-white rounded-lg p-3 border border-amber-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">By Severity</h4>
                  <div className="space-y-1.5">
                    {Object.entries(complicationStats.bySeverity).sort(([,a], [,b]) => b - a).map(([severity, count]) => (
                      <div key={severity} className="flex items-center justify-between text-sm">
                        <span className={`capitalize ${
                          severity === 'minor' ? 'text-green-700' :
                          severity === 'moderate' ? 'text-yellow-700' :
                          severity === 'major' ? 'text-orange-700' :
                          severity === 'life-threatening' ? 'text-red-700' :
                          severity === 'death' ? 'text-gray-900 font-semibold' : 'text-gray-700'
                        }`}>
                          {severity.replace('-', ' ')}
                        </span>
                        <span className="font-medium text-gray-900">{count}</span>
                      </div>
                    ))}
                    {Object.keys(complicationStats.bySeverity).length === 0 && (
                      <p className="text-xs text-gray-500 italic">No severity data</p>
                    )}
                  </div>
                </div>

                {/* By Type */}
                <div className="bg-white rounded-lg p-3 border border-amber-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">By Type</h4>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {Object.entries(complicationStats.byType).sort(([,a], [,b]) => b - a).slice(0, 5).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 truncate mr-2">{type}</span>
                        <span className="font-medium text-gray-900 flex-shrink-0">{count}</span>
                      </div>
                    ))}
                    {Object.keys(complicationStats.byType).length > 5 && (
                      <p className="text-xs text-gray-500">+{Object.keys(complicationStats.byType).length - 5} more types</p>
                    )}
                    {Object.keys(complicationStats.byType).length === 0 && (
                      <p className="text-xs text-gray-500 italic">No type data</p>
                    )}
                  </div>
                </div>

                {/* By Timing */}
                <div className="bg-white rounded-lg p-3 border border-amber-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">By Timing</h4>
                  <div className="space-y-1.5">
                    {Object.entries(complicationStats.byTiming).sort(([,a], [,b]) => b - a).map(([timing, count]) => (
                      <div key={timing} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 capitalize">{timing.replace('-', ' ')}</span>
                        <span className="font-medium text-gray-900">{count}</span>
                      </div>
                    ))}
                    {Object.keys(complicationStats.byTiming).length === 0 && (
                      <p className="text-xs text-gray-500 italic">No timing data</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-amber-700">No complications recorded yet. Complications you track will appear here with detailed statistics.</p>
            )}
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {filteredAndSortedProcedures.length > 0 ? (
            filteredAndSortedProcedures.map((procedure) => (
              <ProcedureCard 
                key={procedure.id} 
                procedure={procedure}
                onArchiveToggle={handleArchiveToggle}
                showArchiveButton={!isSelectionMode}
                isSelectionMode={isSelectionMode}
                isSelected={selectedIds.has(procedure.id)}
                onToggleSelect={() => toggleSelection(procedure.id)}
              />
            ))
          ) : viewMode === 'archived' && archiveCounts.archived === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Archive className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No archived procedures</h3>
              <p className="text-gray-600 mb-4">Procedures you archive will appear here</p>
              <button
                onClick={() => setViewMode('active')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                View active procedures
              </button>
            </div>
          ) : viewMode === 'complicated' && archiveCounts.complicated === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No complicated cases</h3>
              <p className="text-gray-600 mb-4">
                Cases marked as complicated will appear here with statistics.
                <br />
                <span className="text-sm">Track complications when logging or editing procedures.</span>
              </p>
              <button
                onClick={() => setViewMode('active')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                View active procedures
              </button>
            </div>
          ) : procedures.length > 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No procedures found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setCategoryFilter('')
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No procedures yet</h3>
              <p className="text-gray-600 mb-6">Get started by logging your first procedure</p>
              <Link
                href="/dashboard/procedures/new"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Log Your First Procedure
              </Link>
            </div>
          )}
        </div>
      </div>

      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Export Procedures</h2>
                    <p className="text-sm text-gray-500">Download your procedure log</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {archiveCounts.archived > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 flex items-center gap-2">
                  <Archive className="w-4 h-4 flex-shrink-0" />
                  <span>Archived procedures ({archiveCounts.archived}) will not be included in exports.</span>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range <span className="text-gray-400">(optional)</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input
                      type="date"
                      value={exportDateFrom}
                      onChange={(e) => setExportDateFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input
                      type="date"
                      value={exportDateTo}
                      onChange={(e) => setExportDateTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Leave empty to export all {archiveCounts.active} active procedures
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleExport('ebir')}
                  disabled={exportLoading}
                  className="w-full p-4 border-2 border-purple-200 bg-purple-50 rounded-xl text-left hover:border-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-purple-900">EBIR Format</div>
                      <div className="text-sm text-purple-700">
                        European Board of Interventional Radiology logbook format
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        Semicolon-separated (.csv) - Ready for EBIR submission
                      </div>
                    </div>
                    {exportLoading ? (
                      <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handleExport('csv')}
                  disabled={exportLoading}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-left hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">Standard CSV</div>
                      <div className="text-sm text-gray-600">
                        Compatible with Excel, Google Sheets, etc.
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Comma-separated (.csv) - All fields included
                      </div>
                    </div>
                    {exportLoading ? (
                      <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Import Procedures</h2>
                    <p className="text-sm text-gray-500">Import cases from CSV file</p>
                  </div>
                </div>
                <button
                  onClick={resetImportModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Info banner */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 flex items-start gap-2">
                <Archive className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Imported procedures will be automatically added to your <strong>Archive</strong> to distinguish them from natively created cases.</span>
              </div>

              {/* Success message */}
              {importSuccess > 0 && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  ✓ Successfully imported {importSuccess} procedure{importSuccess !== 1 ? 's' : ''}
                </div>
              )}

              {/* Error message */}
              {importError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {importError}
                </div>
              )}

              {/* Download template */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step 1: Download Template
                </label>
                <button
                  onClick={handleDownloadTemplate}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-left hover:border-green-400 hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-8 h-8 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Download CSV Template</div>
                      <div className="text-sm text-gray-500">
                        Pre-filled with your hospitals & categories
                      </div>
                    </div>
                    <Download className="w-5 h-5 text-gray-400 ml-auto" />
                  </div>
                </button>
              </div>

              {/* File upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step 2: Upload Filled CSV
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleImportFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className={`p-4 border-2 border-dashed rounded-xl text-center transition-colors ${
                    importFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-400'
                  }`}>
                    {importFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileSpreadsheet className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">{importFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">
                          Click to select or drag & drop your CSV file
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview */}
              {importPreview.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview (first {importPreview.length} rows)
                  </label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-2 py-1.5 text-left font-medium text-gray-600">ID</th>
                            <th className="px-2 py-1.5 text-left font-medium text-gray-600">Date</th>
                            <th className="px-2 py-1.5 text-left font-medium text-gray-600">Procedure</th>
                            <th className="px-2 py-1.5 text-left font-medium text-gray-600">Role</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {importPreview.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-2 py-1.5 text-gray-600">{row.imported_id || '-'}</td>
                              <td className="px-2 py-1.5 text-gray-600">{row.procedure_date || '-'}</td>
                              <td className="px-2 py-1.5 text-gray-900 max-w-[150px] truncate">{row.procedure_name || '-'}</td>
                              <td className="px-2 py-1.5 text-gray-600">{row.operator_role || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Template field reference */}
              <div className="mb-6">
                <details className="text-sm">
                  <summary className="cursor-pointer text-gray-600 hover:text-gray-800 font-medium">
                    View all template fields
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-1 text-xs text-gray-600">
                    <div><strong>imported_id</strong> - Unique ID (e.g., IMP-001)</div>
                    <div><strong>procedure_date</strong> - Date (YYYY-MM-DD)</div>
                    <div><strong>procedure_name</strong> - Name of procedure</div>
                    <div><strong>operator_role</strong> - 1st Operator / 2nd Operator</div>
                    <div><strong>other_operator_name</strong> - Name of other operator</div>
                    <div><strong>medical_centre</strong> - Hospital name (must match existing)</div>
                    <div><strong>category</strong> - EBIR category (must match existing)</div>
                    <div><strong>accession_number</strong> - Case/Accession number</div>
                    <div><strong>is_complicated</strong> - true/false</div>
                    <div><strong>complication_type</strong> - Type of complication</div>
                    <div><strong>complication_severity</strong> - minor/moderate/major/life-threatening/death</div>
                    <div><strong>complication_timing</strong> - intraprocedural/early/delayed</div>
                    <div><strong>complication_description</strong> - Description</div>
                    <div><strong>complication_management</strong> - How it was managed</div>
                    <div><strong>complication_outcome</strong> - Outcome</div>
                    <div><strong>lessons_learned</strong> - Lessons learned</div>
                    <div><strong>notes</strong> - Additional notes</div>
                  </div>
                </details>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={resetImportModal}
                  className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importFile || importLoading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {importLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Import to Archive
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
