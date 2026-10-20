import { MediaFrame, type MediaFrameProps } from "./MediaFrame";

export interface PhotoPlaceholderProps {
  src?: string;
  label: string;
  alt: string;
  caption?: string;
  aspect?: string;
  tone?: "sand" | "umber" | "ink";
  className?: string;
  icon?: MediaFrameProps["icon"];
}

export function PhotoPlaceholder({
  src,
  label,
  alt,
  caption,
  aspect = "3 / 2",
  className = "",
  icon = "car",
}: PhotoPlaceholderProps) {
  return (
    <MediaFrame
      src={src}
      label={label}
      alt={alt}
      caption={caption}
      aspect={aspect}
      className={className}
      icon={icon}
    />
  );
}
