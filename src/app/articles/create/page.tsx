"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Categorie = {
  id_categorie: number;
  nom_categorie: string;
};

const CreateArticle = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [userId, setUserId] = useState("1"); // ID utilisateur temporaire
  const [image, setImage] = useState("");

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre_article: titre,
        description_article: description,
        id_categorie: selectedCategorie,
        id_user: userId,
        image_article: image,
      }),
    });

    if (response.ok) {
      alert("Article créé avec succès !");
      setTitre("");
      setDescription("");
      setSelectedCategorie("");
      setImage("");
    } else {
      alert("Erreur lors de la création de l'article.");
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white pt-20 pb-20 flex flex-col items-center justify-center mt-16">
      {/* Bouton Retour */}
      <div className="w-[90%] max-w-[600px] mx-auto relative z-10">
        <Link
          href="/articles"
          className="w-32 md:w-36 px-3 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold block text-center text-[12px] md:text-[14px]"
        >
          Retour
        </Link>
      </div>

      <div className="w-[90%] max-w-[600px] mx-auto mt-[30px] flex flex-col items-center justify-center">
        {/* Formulaire */}
        <div className="w-full bg-gray-800 p-4 md:p-6 rounded-md shadow-md">
          <form onSubmit={handleCreateArticle} className="space-y-6">
            {/* Nom article et Catégorie côte à côte */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="titre"
                  className="block text-sm text-white mb-2"
                >
                  Nom de l'article
                </label>
                <input
                  id="titre"
                  type="text"
                  placeholder="Titre de l'article"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full p-2 rounded-md text-black border"
                />
              </div>

              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="categorie"
                  className="block text-sm text-white mb-2"
                >
                  Catégorie
                </label>
                <select
                  id="categorie"
                  value={selectedCategorie}
                  onChange={(e) => setSelectedCategorie(e.target.value)}
                  className="w-full p-2 rounded-md text-black border"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((categorie) => (
                    <option
                      key={categorie.id_categorie}
                      value={categorie.id_categorie}
                    >
                      {categorie.nom_categorie}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="w-full mb-4">
              <label
                htmlFor="description"
                className="block text-sm text-white mb-2"
              >
                Description de l'article
              </label>
              <textarea
                id="description"
                placeholder="Description de l'article"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 md:p-4 rounded-md text-black border h-[180px] md:h-[200px]"
              />
            </div>

            {/* Image (optionnel) */}
            <div className="w-full mb-4 flex flex-col items-center">
              <label htmlFor="image" className="block text-sm text-white mb-2">
                Image
              </label>
              <input
                id="image"
                type="file"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-[80%] md:w-[50%] p-2 rounded-md text-black border"
              />
            </div>

            {/* Bouton Publier */}
            <button
              type="submit"
              className="w-[40%] md:w-[20%] px-3 py-2 md:px-4 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold mt-6 md:mt-8 mx-auto block text-center text-[12px] md:text-[14px]"
            >
              Publier l'article
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
