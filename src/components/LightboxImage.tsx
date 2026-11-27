import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function LightboxImage({ src, alt, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className ?? ""}`}
        onClick={() => setOpen(true)}
      />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
      />
    </>
  );
}
