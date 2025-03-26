"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateCategory = () => {
  const { data: session, status } = useSession();
  const [nomCategorie, setNomCategorie] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Vérification du rôle Admin dès que la session est chargée
  useEffect(() => {
    if (status === "authenticated" && session?.user?.roles === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      if (status === "authenticated") {
        // Redirection si l'utilisateur n'est pas un Admin
        router.push("/"); 
      }
    }
  }, [session, status, router]);

  // Fonction pour créer une catégorie
  const handleCreateCategory = async () => {
    if (!nomCategorie) {
      alert("Le nom de la catégorie ne peut pas être vide.");
      return;
    }

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nom_categorie: nomCategorie }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Catégorie créée !");
      setNomCategorie(""); // Réinitialiser le champ de saisie
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  if (status === "loading") {
    return <div className="text-center text-gray-500">Chargement...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="text-center text-red-500">
        Vous n'êtes pas autorisé à accéder à cette page.
      </div>
    );
  }

  return (
    <div className="w-[40%] h-[40%] mx-auto p-10 bg-gray-800 text-white shadow-md rounded-md border">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Créer une catégorie
      </h1>

      <form className="space-y-4 w-[60%] mx-auto p-8">
        <div className="flex flex-col space-y-2">
          <label htmlFor="nomCategorie">Nom de la catégorie</label>
          <input
            type="text"
            value={nomCategorie}
            onChange={(e) => setNomCategorie(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-black"
            required
            placeholder="Nom de la catégorie"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={handleCreateCategory}
            className="w-24 p-2 mx-auto mt-5 rounded-md hover:text-gray-800 hover:bg-white hover:border-text-gray-800 hover:font-bold text-white border border-white"
          >
            Créer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
