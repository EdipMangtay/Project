'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import TablePagination from '@mui/material/TablePagination'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import TablePaginationComponent from '@/components/TablePaginationComponent'

// Data
const departmentData = [
  { id: 1, company: 'Osman İnşaat', department: 'Hatay Teknik Ofis', manager: 'Osman Özen', employeeCount: 12 },
  { id: 2, company: 'Berkay İnşaat', department: 'Hatay Teknik Ofis1', manager: 'Berkay Ustem', employeeCount: 10 },
  { id: 3, company: 'Erbil İnşaat', department: 'Mekanik', manager: 'Erbil Vurgun', employeeCount: 21 },
  { id: 4, company: 'Emre İnşaat', department: 'Elektrik', manager: 'Emre Tolga', employeeCount: 16 },
  { id: 5, company: 'Osman İnşaat', department: 'Mekanik', manager: 'Osman Özen', employeeCount: 7 }
]

// Fuzzy Filter Function
const fuzzyFilter: FilterFn<any> = (row, columnId, value) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  return itemRank.passed
}

// Column Helper
const columnHelper = createColumnHelper<typeof departmentData[0]>()

const DepartmentTable = () => {
  const [data, setData] = useState(departmentData)
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<typeof departmentData[0], any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            indeterminate={table.getIsSomePageRowsSelected()}
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('company', {
        header: 'ŞİRKET ADI',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('department', {
        header: 'DEPARTMAN ADI',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('manager', {
        header: 'DEPARTMAN SORUMLUSU',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      columnHelper.accessor('employeeCount', {
        header: 'KİŞİ SAYISI',
        cell: info => <Typography>{info.getValue()}</Typography>
      }),
      {
        id: 'actions',
        header: 'İŞLEMLER',
        cell: () => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      globalFilter
    },
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card sx={{ p: 3, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Departman Listesi
        </Typography>
        <input
          type="text"
          placeholder="Ara"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            width: '300px'
          }}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} style={{ borderBottom: '2px solid #e0e0e0' }}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      fontWeight: 'bold',
                      color: '#757575',
                      fontSize: '14px'
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    style={{
                      textAlign: 'left',
                      padding: '12px',
                      color: '#424242',
                      fontSize: '14px'
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
     <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
    </Card>
  )
}

export default DepartmentTable
