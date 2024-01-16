function Chip({ label, color, onClick}) {

  return (
    <span
      className={`max-w-fit h-auto px-2 py-1 rounded-2xl cursor-pointer flex gap-3 border border-gray-300 ${color} float-left`}
      onClick={onClick}
    >
      {label}
    <span className="font-bold">x</span>
    </span>
  );
}

export default Chip;