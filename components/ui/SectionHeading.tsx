export function SectionHeading({
  children,
  align = "center",
  className = "",
}: {
  children: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      <h2 className="text-[22px] font-extrabold uppercase tracking-[0.06em] text-ink-900 sm:text-[26px]">
        {children}
      </h2>
      <span
        className={`mt-4 block h-[3px] w-14 rounded-full bg-danger-500 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
