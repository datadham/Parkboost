import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react"; // Icons for expand/collapse

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      {/* Standard Table View for Medium and Larger Screens */}
      <table className="w-full text-sm hidden md:table">
        <thead className="bg-gray-50 border-b border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 last:border-0">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dropdown View for Small Screens */}
      <div className="md:hidden">
        {table.getRowModel().rows.map((row) => {
          const firstCell = row.getVisibleCells()[0]; // Get the first cell for the title

          // Get the first column's name (header)
          const firstColumnName = flexRender(
            firstCell.column.columnDef.header,
            firstCell.getContext()
          );

          // Get the first cell's value
          const firstColumnValue = flexRender(
            firstCell.column.columnDef.cell,
            firstCell.getContext()
          );

          console.log(firstColumnValue);

          const title = `${firstColumnName} : ${firstColumnValue}`;

          return (
            <div
              key={row.id}
              className="border-b border-gray-200 last:border-0"
            >
              {/* Header with Expand/Collapse Toggle */}
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleRow(row.id)}
              >
                <span className="font-medium text-gray-900">{title}</span>

                {expandedRows[row.id] ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>

              {/* Expanded Content */}
              {expandedRows[row.id] && (
                <div className="px-4 pb-4">
                  {row.getVisibleCells().map((cell, index) => {
                    // Skip the first cell since it's used in the title
                    if (index === 0) return null;

                    return (
                      <div key={cell.id} className="flex flex-col py-2">
                        <span className="text-gray-500 font-medium">
                          {flexRender(
                            cell.column.columnDef.header,
                            cell.getContext()
                          )}
                        </span>
                        <span className="text-gray-900">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
