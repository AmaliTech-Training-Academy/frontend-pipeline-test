import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppTableProps, WithId } from "@/lib/types/app-table";

const AppTable = <T extends WithId>({
  caption,
  columns,
  data,
  renderActions,
  actionsLabel,
  className,
}: AppTableProps<T>) => {
  return (
    <div className={`overflow-x-auto rounded-md border ${className}`}>
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map(col => (
              <TableHead
                key={String(col.key)}
                className={`${col.align === "right" ? "text-right" : ""} px-5 text-muted-foreground bg-muted`}
              >
                {col.label}
              </TableHead>
            ))}
            {renderActions && (
              <TableHead className="text-muted-foreground bg-muted">
                {actionsLabel}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map(row => (
              <TableRow key={row.id}>
                {columns.map(col => (
                  <TableCell
                    key={String(col.key)}
                    className={`${
                      col.align === "right" ? "text-right" : ""
                    } px-5 py-3`}
                  >
                    {col.render
                      ? col.render(row[col.key])
                      : String(row[col.key])}
                  </TableCell>
                ))}
                {renderActions && (
                  <TableCell className="p-0">{renderActions(row)}</TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow className="p-5">
              <TableCell
                colSpan={columns.length + 1}
                className="text-center p-5"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppTable;
