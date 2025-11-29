function BackgroundAccents() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top right accent */}
      <img
        src="/half-circle.svg"
        alt=""
        className="absolute -top-20 -right-20 w-96 h-96 opacity-10"
        style={{ transform: 'rotate(45deg)' }}
      />

      {/* Bottom left accent */}
      <img
        src="/logo-accent-1.svg"
        alt=""
        className="absolute -bottom-32 -left-32 w-80 h-80 opacity-[0.07]"
        style={{ transform: 'rotate(-15deg)' }}
      />

      {/* Middle right accent */}
      <img
        src="/logo-accent-2.svg"
        alt=""
        className="absolute top-1/2 -right-24 w-64 h-64 opacity-[0.05]"
        style={{ transform: 'translateY(-50%) rotate(30deg)' }}
      />

      {/* Bottom right accent */}
      <img
        src="/half-circle.svg"
        alt=""
        className="absolute -bottom-16 right-1/4 w-72 h-72 opacity-[0.08]"
        style={{ transform: 'rotate(120deg)' }}
      />
    </div>
  );
}

export default BackgroundAccents;
