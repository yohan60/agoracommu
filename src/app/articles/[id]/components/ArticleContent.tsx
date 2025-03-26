import React from "react";

// Définition des props attendues par le composant ArticleContent
interface ArticleContentProps {
  description: string;
  image?: string | null;
}

// Fonction pour tronquer la description si elle dépasse une longueur maximale
const truncateDescription = (text: string, maxLength: number = 500): string => {
  // Si la description dépasse la longueur maximale, on la tronque et on ajoute "..."
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Composant ArticleContent
const ArticleContent: React.FC<ArticleContentProps> = ({
  description,
  image,
}) => (
  <div>
    {/* Affichage de la description de l'article (tronquée si trop longue) */}
    <p className="text-sm mb-6">{truncateDescription(description)}</p>

    {/* Affichage de l'image si disponible */}
    {image ? (
      <img
        src={image}
        alt="Article Image"
        className="mt-4 w-full h-auto rounded-md shadow-md"
      />
    ) : (
      <p className="mt-4 text-gray-400">Pas d'image disponible</p>
    )}
  </div>
);

export default ArticleContent;