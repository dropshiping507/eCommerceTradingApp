import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-center border border-slate-700 px-4 py-3 mb-3">
      <Search className="w-4 h-4 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, ID, phone, amount, operator, status, crypto"
        className="pl-10 outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
