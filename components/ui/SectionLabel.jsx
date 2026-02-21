export default function SectionLabel({
  children,
  className = "",
  align = "center",
}) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <p
      className={`section-label ${alignClass} ${className}`}
      style={{ color: "var(--color-gold)" }}
    >
      {children}
    </p>
  );
}
