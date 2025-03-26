"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Définition de l'interface pour un article
interface Article {
  id_article: number;
  titre_article: string;
  description_article: string;
  image_article: string | null;
  created_at: string;
  categorie: {
    nom_categorie: string;
  };
}

const ArticlesPage = () => {
  // Déclare le state avec un type spécifique pour articles
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data); // Assure-toi que `data` est bien de type `Article[]`
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des articles.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.titre_article.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white pt-10 pb-20 flex flex-col">
      <div className="w-[90%] md:w-[80%] h-auto mx-auto mt-[60px] flex flex-col md:flex-row items-center justify-between">
        {/* Section Articles (Gauche) */}
        <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-[60%]">
          <h2 className="bg-gray-800 rounded-md shadow-md text-white text-md md:text-lg font-bold border p-2 md:p-3 text-center w-full md:w-[25%] flex items-center justify-center">
            Tous les articles
          </h2>
          <Link
            href="/articles/create"
            className="w-28 md:w-36 px-3 md:px-4 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold mx-auto block text-center z-10 text-[12px] md:text-[14px]"
          >
            Créer un article
          </Link>
        </div>

        {/* Section Recherche (Droite) */}
        <div className="bg-gray-800 p-2 md:p-3 rounded-md shadow-md text-white w-full md:w-[40%] border mt-4 md:mt-0">
          <h2 className="text-md md:text-lg font-bold mb-3 md:mb-4">
            Rechercher un article
          </h2>
          <input
            type="text"
            placeholder="Nom de l'article..."
            className="w-full p-2 rounded-md text-black border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des Articles */}
      <div className="w-[90%] md:w-[80%] mx-auto mt-8 md:mt-10 border flex-grow">
        {loading ? (
          <p>Chargement des articles...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-gray-800 p-4 md:p-6 rounded-md shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
              Articles disponibles
            </h3>

            {/* Affichage en ligne avec hauteur fixe */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredArticles.length === 0 ? (
                <p>Aucun article trouvé.</p>
              ) : (
                filteredArticles.map((article) => (
                  <Link
                    href={`/articles/${article.id_article}`}
                    key={article.id_article}
                  >
                    <li
                      className="p-3 md:p-4 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition 
                           h-[300px] md:h-[350px] flex flex-col justify-between shadow-md border"
                    >
                      {/* Titre et description */}
                      <div>
                        <h4 className="text-lg md:text-xl text-white font-bold">
                          {article.titre_article}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-300 line-clamp-3">
                          {article.description_article}
                        </p>
                      </div>

                      {/* Gestion des images */}
                      {article.image_article ? (
                        <img
                          src={article.image_article}
                          alt={article.titre_article}
                          className="mt-3 md:mt-4 w-full h-[120px] md:h-[150px] object-cover rounded-md"
                        />
                      ) : (
                        <div className="mt-3 md:mt-4 w-full h-[120px] md:h-[150px] bg-gray-600 rounded-md flex items-center justify-center">
                          <p className="text-gray-500 text-xs md:text-sm">
                            Pas d'image
                          </p>
                        </div>
                      )}

                      {/* Date et catégorie */}
                      <div>
                        <p className="text-xs text-gray-300 mt-2 font-bold">
                          Publié le :{" "}
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-300 mt-2 font-bold">
                          Catégorie : {article.categorie.nom_categorie}
                        </p>
                      </div>
                    </li>
                  </Link>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
