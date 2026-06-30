function ProfileRow({ title, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-3">
      <span className="text-gray-300 text-sm lg:text-base">{title}</span>
      <span className="font-semibold text-sm lg:text-base">{value}</span>
    </div>
  );
}

export default ProfileRow;
