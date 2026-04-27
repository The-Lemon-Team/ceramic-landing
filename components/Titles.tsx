import type { ReactNode } from "react";
import Image from "next/image";

type TitlesProps = {
  overline: ReactNode;
  title: ReactNode;
  icon?: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
  overlineClassName?: string;
  titleClassName?: string;
  titleColorClassName?: string;
  iconClassName?: string;
};

export default function Titles({
  overline,
  title,
  icon,
  iconSrc,
  iconAlt = "",
  iconWidth = 12,
  iconHeight = 12,
  className,
  overlineClassName,
  titleClassName,
  titleColorClassName,
  iconClassName,
}: TitlesProps) {
  return (
    <div className={className}>
      <div
        className={
          overlineClassName ||
          "text-[0.75rem] uppercase tracking-[0.2em] font-bold inline-flex items-center gap-1.5"
        }
      >
        {overline}
        {icon}
        {iconSrc && (
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={iconWidth}
            height={iconHeight}
            className={iconClassName}
          />
        )}
      </div>
      <h2
        className={[
          titleClassName ||
            "text-3xl md:text-5xl font-serif text-stone-800 dark:text-stone-50",
          titleColorClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </h2>
    </div>
  );
}
