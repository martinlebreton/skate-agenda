import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Coffee, Plus, X } from "lucide-react";

export default function Contact() {
  const [isTallyOpen, setIsTallyOpen] = useState(false);

  useEffect(() => {
    if (!isTallyOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsTallyOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isTallyOpen]);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Helmet>
        <title>Contact - Skate Event</title>
        <meta
          name="description"
          content="Contactez Skate Event pour ajouter un événement skate à l'agenda ou soutenir le projet."
        />
      </Helmet>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-teal-600">
          Contact
        </h1>
        <p className="text-gray-500 mt-1">
          Skate Event - L'app des événements skate en France
        </p>
      </header>

      <div className="space-y-8 text-gray-700">
        <section className="space-y-3 rounded-xl border border-teal-200 bg-teal-50 p-5 text-teal-950 ">
          <h2 className="text-lg font-bold text-black">
            Vous organisez un événement skate ?
          </h2>
          <p>
            Faites connaître votre événement à toute la communauté skate en
            France.
          </p>
          <button
            type="button"
            onClick={() => setIsTallyOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-teal-700"
          >
            <Plus size={18} aria-hidden="true" />
            Ajouter un événement
          </button>

          <p className="text-sm text-gray-500">
            Je réponds dès la fin de session.
          </p>
        </section>

        <section className="space-y-3 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold text-black">À propos</h2>
          <p>Skate Event est développé par pur plaisir du skate.</p>
          <p>
            Les informations des événements et des fiches organisateurs sont
            publiées à titre indicatif. Skate Event ne peut être tenu
            responsable des erreurs ou inexactitudes dans ces contenus.
          </p>
        </section>

        <section className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950 ">
          <div className="flex items-center gap-2">
            <Coffee size={20} className="text-amber-700" aria-hidden="true" />
            <h2 className="text-lg font-bold">Soutenir le projet</h2>
          </div>
          <p className="text-amber-900">
            Vous pouvez soutenir le développement et l'hébergement de Skate
            Event en offrant un café :{" "}
          </p>
          <p>
            <a
              href="https://buymeacoffee.com/martinlebreton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-100 px-4 py-2 font-semibold text-amber-900 no-underline transition-colors hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-amber-700"
            >
              <Coffee size={18} aria-hidden="true" />
              M'offrir un café
            </a>
          </p>
        </section>

        <section className="space-y-4 border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-black">
            Liste des contests et événements skate en France
          </h2>
          <p>
            Depuis plusieurs années, la scène skate française connaît une
            dynamique exceptionnelle. Des contests locaux organisés par des
            associations passionnées aux championnats régionaux rassemblant les
            meilleurs riders, les événements skate se multiplient partout en
            France. Street, bowl, rampe, park ou best trick : chaque discipline
            possède sa propre énergie, son public et ses acteurs engagés.
            Pourtant, il restait difficile de retrouver facilement l’ensemble
            des compétitions et rassemblements dans un seul espace dédié à la
            culture skate.
          </p>
          <p>
            Lancée début 2026, SkateEvent est une application pensée pour
            centraliser et promouvoir tous les événements skate en France. Mon
            objectif est simple : permettre aux riders, clubs, associations,
            bénévoles et passionnés de découvrir rapidement les contests et
            compétitions organisés près de chez eux ou partout sur le
            territoire. Grâce à une plateforme claire, une web app de skate,
            SkateEvent facilite l’accès aux informations essentielles : dates,
            lieux, formats, catégories, inscriptions, résultats et
            organisateurs. Tu as dans la poche un véritable agenda national du
            skateboard, constamment mis à jour et accessible à tous.
          </p>
          <p>
            Que vous soyez amateur de skate street, adepte du bowl, passionné de
            mini-rampe ou compétiteur confirmé, SkateEvent met en avant une
            grande diversité d’événements. La plateforme valorise autant les
            petites compétitions locales qui font vivre les skateparks que les
            grands rendez-vous régionaux et nationaux. Derrière chaque
            événement, il y a des bénévoles, des collectifs, des associations de
            skate et des structures qui travaillent toute l’année pour faire
            évoluer la scène skate française. SkateEvent souhaite leur offrir
            une visibilité durable et contribuer au développement d’une
            communauté plus connectée.
          </p>
          <p>
            Autre ambition à long terme : devenir la référence des événements
            skate en France. En centralisant les contests, démonstrations, jams,
            compétitions officielles et rassemblements associatifs, nous voulons
            créer un véritable agenda national du skateboard. Riders débutants
            ou expérimentés pourront ainsi découvrir de nouveaux spots,
            rencontrer d’autres pratiquants et participer plus facilement aux
            événements qui animent la culture skate et savoir où rouler ce
            week-end.
          </p>
          <p>
            SkateEvent s’adresse également aux organisateurs. Vous organisez une
            compétition street, un contest bowl, une jam session ou un
            championnat régional ? La plateforme vous permet de diffuser votre
            événement auprès d’une communauté engagée et passionnée. Je crois
            que chaque événement mérite d’être vu, partagé et soutenu, quelle
            que soit sa taille.
          </p>

          <h3 className="pt-2 text-lg font-bold text-black">
            Vision pour la scène skate en France
          </h3>
          <p>
            La scène skate française évolue grâce à celles et ceux qui
            organisent, construisent, jugent, roulent et transmettent cette
            culture au quotidien. Compétition, Skateapark, Skateshop, salle de
            spectacle,... les acteurs sont nombreux. Avec SkateEvent, je
            souhaite créer un outil moderne capable de rassembler tous ces
            acteurs autour d’une même passion : la planche à roulettes.
          </p>
        </section>
      </div>

      {isTallyOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ajouter un événement"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsTallyOpen(false);
          }}
        >
          <div className="relative h-[min(85vh,720px)] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setIsTallyOpen(false)}
              aria-label="Fermer le formulaire"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-teal-700"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <iframe
              src="https://tally.so/r/Arvqxl"
              title="Formulaire d'ajout d'un événement Skate Event"
              className="h-full w-full border-0"
              allow="camera; microphone"
            />
          </div>
        </div>
      )}
    </div>
  );
}
