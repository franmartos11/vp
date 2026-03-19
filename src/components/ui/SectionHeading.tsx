interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "";
  const textColor = light ? "text-cream-100" : "text-charcoal-900";
  const subtitleColor = light ? "text-warm-300" : "text-warm-500";
  const eyebrowColor = light ? "text-warm-300" : "text-warm-500";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${eyebrowColor}`} aria-hidden="true">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-display-lg font-display ${textColor} text-balance leading-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base ${subtitleColor} max-w-xl leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
