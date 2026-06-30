function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-6">
      <h3 className="text-gray-700 text-lg mb-6">{title}</h3>

      <div className="border-t pt-6 text-red-500 text-xl">{value}</div>
    </div>
  );
}
export default StatCard;
