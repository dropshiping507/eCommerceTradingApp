function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-8 rounded-full bg-gradient-to-b from-purple-400 to-fuchsia-500"></div>

      <h2 className="text-sm lg:text-xl font-bold">{title}</h2>
    </div>
  );
}

export default SectionTitle;
