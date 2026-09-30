/** Lightweight stand-in shown before WebGL arms, or when it cannot run. */
export function DoorFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(255,92,40,.16), transparent 68%)" }}
      />
      <div className="mjs-grid-bg absolute inset-0 opacity-[0.5]" />
    </div>
  );
}
