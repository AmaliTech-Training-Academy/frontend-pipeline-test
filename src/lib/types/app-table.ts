export type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "right";
  render?: (value: T[keyof T]) => React.ReactNode;
};

export type AppTableProps<T> = {
  caption?: string;
  columns: Column<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  actionsLabel?: string;
  className?: string;
};
export type WithId = {
  id: string | number;
};
