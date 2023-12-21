"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { TransactionData } from "@/types";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { addMonths } from "date-fns";

function TransactionTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const { data, mutate } = useSWR(
    "http://localhost:9000/transactions",
    async (url) => {
      const response = await axios.get(url);
      const fetchedTransactions: TransactionData[] = response.data;
      setTransactions(fetchedTransactions);
    }
  );

  const handleTransactionStatus = async (
    transactionId: string,
    status: string
  ) => {
    try {
      await axios.patch(`http://localhost:9000/transactions/${transactionId}`, {
        status: status,
        updated_at: new Date(),
      });

      if (status === "completed") {
        const email = transactions[Number(transactionId) - 1].user;
        const type = transactions[Number(transactionId) - 1].type;

        await axios
          .get(`http://localhost:9000/users?email=${email}`)
          .then((response) => {
            let previousDate = response.data[0].expired_subs;
            console.log(previousDate);
            if (previousDate === "") {
              previousDate = new Date();
            }
            const newExpireDate = addMonths(new Date(previousDate), type);
            console.log(newExpireDate);
            return axios.patch(
              `http://localhost:9000/users/${response.data[0].id}`,
              {
                membership: "premium",
                expired_subs: newExpireDate,
              }
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnDef<TransactionData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "user",
      header: "User Email",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("user")}</div>
      ),
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Transaction Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase pl-4">
          {new Date(row.getValue("created_at")).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        if (row.getValue("status") === "processing") {
          return (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Awaiting Action..</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-3xl">
                    Complete Transaction
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    Complete this transaction? <br />
                    This action can not be undone
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose className="flex flex-row gap-3">
                    <Button
                      type="button"
                      onClick={() =>
                        handleTransactionStatus(row.getValue("id"), "completed")
                      }
                    >
                      Complete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        } else {
          return (
            <Badge
              className={`pointer-events-none rounded-xl px-3 py-1 font-semibold ${
                row.getValue("status") === "completed"
                  ? "border-none bg-green-100 text-green-500"
                  : row.getValue("status") === "canceled"
                  ? "border-none bg-red-200 text-red-500"
                  : null
              }`}
            >
              {row.getValue("status")}
            </Badge>
          );
        }
      },
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-10 bg-white">
      <div className="my-10 flex-col text-center">
        <h1 className="font-heading text-xl md:text-3xl">Transactions</h1>
        <h3 className="leading-tight text-muted-foreground sm:text-xl sm:leading-8">
          Manage transactions
        </h3>
      </div>
      <div className="w-full">
        <div className="flex items-end py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("user")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border text-base">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground"></div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
