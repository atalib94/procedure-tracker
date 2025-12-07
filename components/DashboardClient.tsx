'use client'

import { useState, useMemo } from 'react'
import { Plus, Search, ArrowUpDown, ArrowUp, ArrowDown, Calendar, Filter, Download, FileSpreadsheet, X, Loader2, RefreshCw, Archive, ArchiveRestore, FolderOpen } from 'lucide-react'
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
}

type SortField = 'procedure_date' | 'procedure_name' | 'created_at'
type SortDirection = 'asc' | 'desc'
type ViewMode = 'active' | 'archived'

export default function DashboardClient({
  procedures: initialProcedures,
  totalProcedures,
  asFirstOperator,
  medicalCentres,
  categoriesUsed,
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

  // Refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  // Archive toggle function
  const handleArchiveToggle = async (id: string, archived: boolean) => {
    const { error } = await supabase
      .from('procedures')
      .update({ archived })
      .eq('id', id)

    if (!error) {
      // Update local state
      setProcedures(prev => 
        prev.map(p => p.id === id ? { ...p, archived } : p)
      )
    }
  }

  // Get unique categories from procedures
  const categories = useMemo(() => {
    const cats = new Set<string>()
    procedures.forEach(p => {
      if (p.ebir_categories?.name) {
        cats.add(p.ebir_categories.name)
      }
    })
    return Array.from(cats).sort()
  }, [procedures])

  // Count archived and active procedures
  const archiveCounts = useMemo(() => {
    const archived = procedures.filter(p => p.archived).length
    const active = procedures.filter(p => !p.archived).length
    return { archived, active }
  }, [procedures])

  // Filter and sort procedures
  const filteredAndSortedProcedures = useMemo(() => {
    let filtered = procedures.filter(p => {
      // View mode filter (archived vs active)
      const matchesViewMode = viewMode === 'archived' ? p.archived : !p.archived
      
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery || 
        p.procedure_name?.toLowerCase().includes(searchLower) ||
        p.notes?.toLowerCase().includes(searchLower) ||
        p.accession_number?.toLowerCase().includes(searchLower) ||
        p.ebir_categories?.name?.toLowerCase().includes(searchLower) ||
        p.medical_centres?.name?.toLowerCase().includes(searchLower)
      
      // Category filter
      const matchesCategory = !categoryFilter || p.ebir_categories?.name === categoryFilter
      
      return matchesViewMode && matchesSearch && matchesCategory
    })

    // Sort
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

  // Export to CSV (EBIR format)
  const handleExport = (format: 'csv' | 'ebir') => {
    setExportLoading(true)
    
    try {
      // Filter by date range if specified, exclude archived
      let dataToExport = procedures.filter(p => !p.archived)
      
      if (exportDateFrom) {
        dataToExport = dataToExport.filter(p => p.procedure_date >= exportDateFrom)
      }
      if (exportDateTo) {
        dataToExport = dataToExport.filter(p => p.procedure_date <= exportDateTo)
      }

      // Sort by date
      dataToExport.sort((a, b) => new Date(a.procedure_date).getTime() - new Date(b.procedure_date).getTime())

      let csvContent = ''
      let filename = ''

      if (format === 'ebir') {
        // EBIR Format: specific columns for European Board of Interventional Radiology
        const headers = [
          'Date',
          'EBIR Category Code',
          'EBIR Category',
          'Procedure Name',
          'Role',
          'Medical Centre',
          'Case ID',
          'Notes'
        ]
        
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
        // Standard CSV format
        const headers = [
          'Date',
          'Procedure Name',
          'Category',
          'Category Code',
          'Operator Role',
          'Medical Centre',
          'Case ID',
          'Notes',
          'Created At'
        ]
        
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

      // Create and download file
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
      {/* HIPAA Notice */}
      <HIPAANotice />

      {/* Stats Cards */}
      <StatsCards
        totalProcedures={totalProcedures}
        asFirstOperator={asFirstOperator}
        medicalCentres={medicalCentres}
        categoriesUsed={categoriesUsed}
      />

      {/* Procedures List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {/* View Mode Toggle */}
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
              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* Export button */}
              <button
                onClick={() => setShowExportModal(true)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export"
              >
                <Download className="w-5 h-5" />
              </button>

              {/* Add new procedure */}
              <Link
                href="/dashboard/procedures/new"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Procedure</span>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
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
              {/* Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Filter className="w-5 h-5" />
              </button>

              {/* Sort dropdown */}
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

          {/* Filter Panel */}
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

        {/* Results count */}
        {(searchQuery || categoryFilter) && (
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
            {filteredAndSortedProcedures.length} procedure{filteredAndSortedProcedures.length !== 1 ? 's' : ''} found
            {searchQuery && <span> for "{searchQuery}"</span>}
            {categoryFilter && <span> in {categoryFilter}</span>}
          </div>
        )}

        {/* Archive info banner */}
        {viewMode === 'archived' && archiveCounts.archived > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2 text-sm text-gray-600">
            <Archive className="w-4 h-4" />
            <span>Showing archived procedures. Click <ArchiveRestore className="w-4 h-4 inline" /> to restore.</span>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {filteredAndSortedProcedures.length > 0 ? (
            filteredAndSortedProcedures.map((procedure) => (
              <ProcedureCard 
                key={procedure.id} 
                procedure={procedure}
                onArchiveToggle={handleArchiveToggle}
                showArchiveButton={true}
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

      {/* Export Modal */}
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

              {/* Info about archived */}
              {archiveCounts.archived > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 flex items-center gap-2">
                  <Archive className="w-4 h-4 flex-shrink-0" />
                  <span>Archived procedures ({archiveCounts.archived}) will not be included in exports.</span>
                </div>
              )}

              {/* Date Range Filter */}
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

              {/* Export Format Options */}
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
                        Semicolon-separated (.csv) • Ready for EBIR submission
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
                        Comma-separated (.csv) • All fields included
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
    </div>
  )
}
