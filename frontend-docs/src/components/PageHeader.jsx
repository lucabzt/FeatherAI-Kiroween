export default function PageHeader({ title, subtitle }) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-3 text-white">
          {title}
        </h1>
        <p className="text-xl text-[#a0a0a3]">
          {subtitle}
        </p>
      </div>

      <div className="opacity-20 mb-6 h-1.5 w-full bg-gradient-to-r from-[#be3389] via-[#22c4e0] to-[#0357c1] rounded-full"></div>
    </>
  );
}
