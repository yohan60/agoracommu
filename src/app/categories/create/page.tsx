"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreateCategoryPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom_categorie: categoryName }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la catégorie");
      }

      // Rediriger vers la page des catégories après la création
      router.push("/categories");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Utilise `err.message` car `err` est maintenant de type `Error`
      } else {
        setError("Une erreur inconnue est survenue");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white pt-20 pb-20 flex flex-col items-center justify-center">
      {/* Bouton Retour - Ajustement du margin top */}
      <div className="w-[90%] max-w-[800px] mx-auto relative z-10 mb-4">
        <Link
          href="/categories"
          className="w-28 md:w-36 px-3 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold block text-center text-[12px] md:text-[14px]"
        >
          Retour
        </Link>
      </div>

      {/* Formulaire Créer une catégorie avec un border */}
      <div className="w-[90%] max-w-[800px] mx-auto mt-[10px] flex flex-col items-center justify-center bg-gray-800 p-6 md:p-12 rounded-md shadow-lg border border-gray-600">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-10">
          Créer une catégorie
        </h2>

        {/* Affichage des erreurs si présentes */}
        {error && <p className="text-red-500">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 md:space-y-6"
        >
          <div>
            <label className="block text-white mb-2 text-sm md:text-base">
              Nom de la catégorie
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="w-full p-2 md:p-3 rounded-md text-black border border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bouton Créer catégorie avec taille agrandie */}
          <button
            type="submit"
            className="w-[60%] md:w-[50%] mx-auto block px-6 md:px-8 py-3 md:py-4 rounded-md text-white font-semibold border border-white hover:bg-white hover:text-gray-800 hover:border-gray-800 text-sm md:text-base"
          >
            Créer la catégorie
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
