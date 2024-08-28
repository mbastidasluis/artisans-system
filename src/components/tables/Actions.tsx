import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"

interface ActionOption {
  label: string
  callback: any
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  options: ActionOption[]
}

export function DataTableRowActions<TData>({ row, options }: DataTableRowActionsProps<TData>) {

  // TODO receive actions and callbacks as props
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {options.map(({ label, callback }) => (
          <DropdownMenuItem key={label} onClick={()=>callback(row.original)}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}