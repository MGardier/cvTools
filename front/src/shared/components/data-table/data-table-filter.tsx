import type { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface DataTableFilterProps<TData> {
  table: Table<TData>,
  placeHolderText: string,
}

export function DataTableFilter<TData>({ table , placeHolderText } : DataTableFilterProps<TData>) {
  return <Input
          placeholder={placeHolderText}
          value={
            (table.getColumn("enterprise")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("enterprise")?.setFilterValue(event.target.value)
          }
          className="lg:max-w-sm  max-w-1/4"
        />
}



