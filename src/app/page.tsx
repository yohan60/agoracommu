"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([]); // Articles récupérés de l'API
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string>(""); // Erreur en cas de problème

  // Utilisation de useEffect pour récupérer les articles à l'initialisation
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }
        const data = await response.json();
        setArticles(data); // On met les articles dans l'état
      } catch (err: any) {
        setError(err.message); // On récupère l'erreur et on l'affiche
      } finally {
        setLoading(false); // On arrête le chargement
      }
    };

    fetchArticles(); // Appel de la fonction pour récupérer les articles
  }, []);

  return (
    <>
      {/* Bannière */}
      <div className="w-full relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
        {/* Image de fond avec opacité */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url("/AC.png")' }} // Utilise des guillemets doubles ici
        ></div>

        {/* Contenu centré */}
        <h1 className="relative text-4xl md:text-5xl font-bold tracking-wide mt-24 text-center">
          AGORA COMMUNITY
        </h1>

        {/* Texte */}
        <p className="w-[90%] sm:w-[70%] md:w-[60%] relative text-lg md:text-xl mt-6 z-10 text-center">
          Agora Community est une plateforme collaborative dédiée aux passionnés
          de développement. Elle permet aux utilisateurs de partager leurs
          connaissances en publiant des articles sur diverses technologies, tout
          en offrant un espace pour interagir, poser des questions et répondre
          aux demandes d&apos;aide d&apos;autres membres. Que vous soyez novice
          ou expert, Agora Community est le lieu où les développeurs peuvent
          échanger librement, s&rsquo;entraider et approfondir leurs compétences
          à travers une communauté active.
        </p>

        {/* Bouton pour accéder à la page des articles */}
        <Link
          href="/articles"
          className="w-44 sm:w-52 px-4 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold mt-8 mx-auto block text-center z-10 text-[13px] sm:text-[14px]"
        >
          Voir les articles
        </Link>
      </div>
    </>
  );
}
