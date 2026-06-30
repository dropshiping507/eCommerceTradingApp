function ActionCard({ icon, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center p-8 cursor-pointer"
    >
      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
        {icon}
      </div>

      <p className="mt-3 text-black">{title}</p>
    </div>
  );
}

export default ActionCard;
