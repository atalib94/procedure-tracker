'use client'

import { useState, useMemo } from 'react'
import { Plus, Search, ArrowUpDown, ArrowUp, ArrowDown, Calendar, Filter, Download, FileSpreadsheet, X, Loader2, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProcedureCard from '@/components/ProcedureCard'
import StatsCards from '@/components/StatsCards'
import HIPAANotice from '@/components/HIPAANotice'

interface DashboardClientProps {
  procedures: any[]
  totalProcedures: number
  asFirstOperator: number
  medicalCentres: number
  categoriesUsed: number
}

type SortField = 'procedure_date' | 'procedure_name' | 'created_at'
type SortDirection = 'asc' | 'desc'

export default function DashboardClient({
  procedures,
  totalProcedures,
  asFirstOperator,
  medicalCentres,
  categoriesUsed,
}: DashboardClientProps) {
  const router = useRouter()
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

  // Refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true)
    router.refresh()
    // Give visual feedback for at least 500ms
    setTimeout(() => setIsRefreshing(false), 500)
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

  // Filter and sort procedures
  const filteredAndSortedProcedures = useMemo(() => {
    let filtered = procedures.filter(p => {
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
      
      return matchesSearch && matchesCategory
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
  }, [procedures, searchQuery, sortField, sortDirection, categoryFilter])

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
      // Filter by date range if specified
      let dataToExport = [...procedures]
      
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
          'Accession Number',
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
          'Accession Number',
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
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)

      setShowExportModal(false)
      setExportDateFrom('')
      setExportDateTo('')
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data')
    } finally {
      setExportLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HIPAA Notice */}
      <HIPAANotice />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="hidden sm:block">
          <h1 className="text-3xl font-bold text-gray-900">Procedure Log</h1>
          <p className="text-gray-600 mt-1">Track your interventional radiology procedures</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center p-2.5 sm:p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex-1 sm:flex-none"
          >
            <Download className="w-5 h-5" />
            <span className="sm:inline">Export</span>
          </button>
          <Link
            href="/dashboard/procedures/new"
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex-1 sm:flex-none"
          >
            <Plus className="w-5 h-5" />
            Log Procedure
          </Link>
        </div>
      </div>

      {/* Stats */}
      <StatsCards
        totalProcedures={totalProcedures}
        asFirstOperator={asFirstOperator}
        medicalCentres={medicalCentres}
        categoriesUsed={categoriesUsed}
      />

      {/* Procedures List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Recent Procedures</h2>
            
            <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:justify-end">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search procedures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  showFilters || categoryFilter
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filter
                {categoryFilter && (
                  <span className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">1</span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1">
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as SortField)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      Sort: {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
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

        <div className="divide-y divide-gray-200">
          {filteredAndSortedProcedures.length > 0 ? (
            filteredAndSortedProcedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))
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
                  Leave empty to export all {procedures.length} procedures
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
