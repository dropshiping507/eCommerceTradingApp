function StatCard({ title, value }) {
  return (
    <div
      className="p-6 border border-slate-700
        hover:shadow-2xl hover:-translate-y-1 duration-300 cursor-pointer
      "
    >
      <h2 className="text-2xl font-bold wrap-break-word">{value}</h2>

      <p className="mt-3 text-sm">{title}</p>
    </div>
  );
}

export default StatCard;
