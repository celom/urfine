import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@uptime/components/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@uptime/components/table';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { Check, CheckForm } from '../common/types/check';
import { CheckFormDialog } from './checkFormDialog';

interface CheckListProps {
  checks: Check[];
  locations: string[];
  onEditCheck: (check: CheckForm) => void;
}

export default function CheckList({
  checks,
  locations,
  onEditCheck,
}: CheckListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState<Check | null>(null);

  const columns: ColumnDef<Check>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span className="">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.msp_address}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'state_is_up',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={
            row.original.state_is_up ? 'text-green-500' : 'text-red-500'
          }
        >
          {row.original.state_is_up ? 'UP' : 'DOWN'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (check: Check) => {
    setIsDialogOpen(true);
    setSelectedCheck(check);
  };

  const handleDialogClose = () => {
    setSelectedCheck(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (checkData: CheckForm) => {
    if (selectedCheck) {
      onEditCheck({ ...checkData, pk: selectedCheck.pk });
    }
  };

  const table = useReactTable({
    data: checks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-6">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CheckFormDialog
        isOpen={isDialogOpen}
        initialData={selectedCheck}
        locations={locations}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
