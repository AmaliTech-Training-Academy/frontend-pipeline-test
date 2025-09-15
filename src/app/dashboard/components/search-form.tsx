import { Search } from "lucide-react";

export function SearchForm() {
  return (
    <form className="flex items-center gap-2 border px-4 py-1 rounded-sm">
      <Search size={14} />
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search..."
        className="outline-none"
      />
    </form>
  );
}
