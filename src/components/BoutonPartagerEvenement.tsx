import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function BoutonPartagerEvenement({
  title,
  slug,
  className = "",
}: {
  title: string;
  slug: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const eventUrl = new URL(
    `/agenda/${slug}`,
    window.location.origin,
  ).toString();

  async function shareEvent() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: eventUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      }
    }

    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copiez le lien de l'événement :", eventUrl);
    }
  }

  return (
    <button
      type="button"
      onClick={shareEvent}
      aria-label={copied ? "Lien copié" : `Partager ${title}`}
      title={copied ? "Lien copié" : "Partager l'événement"}
      className={`shrink-0 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-black focus-visible:outline-2 focus-visible:outline-teal-700 md:hidden ${className}`}
    >
      {copied ? (
        <Check size={18} aria-hidden="true" />
      ) : (
        <Share2 size={18} aria-hidden="true" />
      )}
    </button>
  );
}
