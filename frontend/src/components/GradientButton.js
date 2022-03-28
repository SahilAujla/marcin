
export default function GradientButton({ text, onClick }) {
  return (
    <div
      className="max-w-sm rounded-lg  bg-[#10fcc7]  text-center font-semibold text-lg"
      onClick={onClick}
    >
      <span className="block px-2 py-4 rounded-lg  bg-[#10fcc7] text-xl text-white  cursor-pointer">
        {text}
      </span>
    </div>
  );
}
