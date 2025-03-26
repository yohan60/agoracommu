"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleHeader from "./components/ArticleHeader";
import ArticleContent from "./components/ArticleContent";
import Link from "next/link";

// Interfaces pour les données d'article et de message
interface Article {
  id_article: number;
  titre_article: string;
  description_article: string;
  image_article: string | null;
  created_at: string;
  categorie: { nom_categorie: string };
  user: { username: string; roles: string };
  messages: Message[]; // Inclure les messages directement dans l'article
}

interface Message {
  id_message: number;
  description_message: string;
  created_at: string;
  user: {
    roles: string;
    username: string;
  };
}

const ArticleDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const [article, setArticle] = useState<Article | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [nouveauMessage, setNouveauMessage] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);

  // Récupérer l'article et ses messages au chargement
  useEffect(() => {
    if (!id) {
      console.error("ID de l'article non défini");
      return;
    }

    const recupererArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error("Impossible de charger l'article.");
        const data = await res.json();
        setArticle(data); // Récupérer l'article avec ses messages
        setMessages(data.messages); // Messages inclus dans l'article
      } catch (err) {
        setErreur(
          err instanceof Error ? err.message : "Une erreur est survenue."
        );
      } finally {
        setChargement(false);
      }
    };

    recupererArticle();
  }, [id]);

  // Gérer l'envoi de nouveaux messages
  const handleEnvoyerMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauMessage.trim()) return;

    try {
      const res = await fetch(`/api/articles/${id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: nouveauMessage,
          userId: 1,
          articleId: id,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi du message.");
      const nouveauMsg = await res.json();
      setMessages((prevMessages) => [...prevMessages, nouveauMsg]);
      setNouveauMessage(""); // Réinitialiser le champ de texte
    } catch (err) {
      console.error(err);
    }
  };

  if (chargement) return <p className="text-center text-lg">Chargement...</p>;
  if (erreur) return <p className="text-center text-red-500">{erreur}</p>;
  if (!article) return <p className="text-center">Aucun article trouvé.</p>;

  return (
    <div className="w-full pb-6 mt-10 article-section flex flex-col items-center overflow-y-auto">
      {/* Bouton Retour */}
      <div className="w-[90%] md:w-[50%] mx-auto mt-6 md:mt-12 mb-6 md:mb-8">
        <Link
          href="/articles"
          className="w-28 md:w-36 px-3 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold block text-center text-[12px] md:text-[14px]"
        >
          Retour
        </Link>
      </div>

      {/* Contenu de l'article */}
      <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg text-white">
        <ArticleHeader
          title={article.titre_article}
          username={article.user.username}
          roles={article.user.roles}
        />
        <div className="flex justify-between text-xs md:text-sm mb-3 md:mb-4">
          <p className="font-bold">
            Catégorie : {article.categorie.nom_categorie}
          </p>
          <p className="font-bold">
            Publié le : {new Date(article.created_at).toLocaleDateString()} à{" "}
            {new Date(article.created_at).toLocaleTimeString()}
          </p>
        </div>
        <hr className="border-t-2 border-white mb-4 md:mb-6" />
        <ArticleContent
          description={article.description_article}
          image={article.image_article}
        />
      </div>

      {/* Liste des messages */}
      <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg text-white mt-6">
        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Messages</h3>
        {messages.length > 0 ? (
          <div className="space-y-4 md:space-y-6">
            {messages.map((message) => (
              <div key={message.id_message} className="pb-3 md:pb-4">
                <div className="flex justify-between text-xs md:text-sm mb-2">
                  <div className="flex items-center">
                    <p className="text-xs md:text-sm font-semibold text-gray-400 uppercase mr-2">
                      Réponse de :
                    </p>
                    <p className="text-md md:text-lg font-bold text-blue-500 flex items-center">
                      {message.user?.username || "Utilisateur inconnu"}
                    </p>
                  </div>
                  <p className="font-bold">
                    Publié le :{" "}
                    {new Date(message.created_at).toLocaleDateString()} à{" "}
                    {new Date(message.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <hr className="border-t-2 border-white my-2" />
                <p className="text-white text-sm md:text-md">
                  {message.description_message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            Aucun message pour cet article.
          </p>
        )}
      </div>

      {/* Formulaire de réponse */}
      <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg text-white mt-6 flex flex-col relative">
        <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
          Répondre à cet article
        </h3>
        <form
          onSubmit={handleEnvoyerMessage}
          className="space-y-3 md:space-y-4 flex flex-col items-center flex-1 overflow-y-auto"
        >
          <textarea
            value={nouveauMessage}
            onChange={(e) => setNouveauMessage(e.target.value)}
            placeholder="Écrivez votre message ici..."
            className="w-full p-2 bg-gray-900 text-white border rounded-md focus:outline-none"
            rows={4}
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md mt-auto overflow-y-auto"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
