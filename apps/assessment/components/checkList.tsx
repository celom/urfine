import { CheckInsert, CheckUpdate, Check } from '../common/types/check';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@uptime/components/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '../../../libs/components/src/button/button';
import { Edit, Pause } from 'lucide-react';

interface CheckListProps {
  checks: Check[];
  onEditCheck: (check: CheckInsert) => void;
}

export default function CheckList({ checks, onEditCheck }: CheckListProps) {
  const columns: ColumnDef<Check>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'url',
      header: 'URL',
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
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditCheck(row.original)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePause(row.original.pk)}
          >
            <Pause className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handlePause = (checkId: string) => {
    console.log(`Pause check with id: ${checkId}`);
    // Implement pause functionality here
  };

  const table = useReactTable({
    data: checks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
