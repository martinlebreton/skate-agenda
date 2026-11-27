import { Helmet } from "react-helmet-async";

export default function Contact() {
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
          L'app des événements skate en France
        </p>
      </header>

      <div className="space-y-8 text-gray-700">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-black">
            Vous organisez un événement skate ?
          </h2>
          <p>
            Faites connaître votre événement à toute la communauté skate en
            France. Écrivez-nous pour l'ajouter à l'agenda :{" "}
            <a
              href="mailto:martinlebreton@gmail.com"
              className="font-medium text-teal-700 underline underline-offset-2"
            >
              martinlebreton@gmail.com
            </a>
            .
          </p>
          <p className="text-sm text-gray-500">
            Nous vous répondrons dès la fin de session.
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

        <section className="space-y-3 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold text-black">Soutenir le projet</h2>
          <p>
            Vous pouvez soutenir le développement de Skate Event en offrant un
            café :{" "}
            <a
              href="https://buymeacoffee.com/martinlebreton"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-700 underline underline-offset-2"
            >
              Buy Me a Coffee
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
