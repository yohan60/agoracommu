"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger les informations actuelles de l'utilisateur
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profil");
        const data = await res.json();
        if (res.ok) {
          setUser({
            username: data.username,
            description: data.description || "",
            image: data.image || "/default-avatar.png",
          });
        } else {
          console.error(
            "Erreur lors de la récupération des données :",
            data.error
          );
        }
      } catch (error) {
        console.error("Erreur de réseau :", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/profil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        router.push("/profil");
      } else {
        console.error("Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      console.error("Erreur de réseau :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] md:w-[60%] mx-auto">
      {/* Bouton Retour */}
      <div className="mb-4">
        <Link
          href="/profil"
          className="w-36 px-4 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold block text-center text-[14px]"
        >
          Retour
        </Link>
      </div>

      {/* Formulaire de modification du profil */}
      <div className="p-6 md:p-8 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Modifier le profil
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base md:text-lg font-bold mb-2 text-white">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full md:w-[80%] p-3 rounded-md bg-white text-black border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-base md:text-lg font-bold mb-2 text-white">
              Biographie
            </label>
            <textarea
              value={user.description}
              onChange={(e) =>
                setUser({ ...user, description: e.target.value })
              }
              placeholder="Changer la biographie"
              className="w-full p-3 rounded-md bg-white text-black border border-gray-700"
              rows={4}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-[50%] mx-auto block p-3 rounded-md text-white text-base md:text-lg font-semibold border border-gray-600 transition ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gray-800 hover:bg-white hover:text-gray-800"
            }`}
          >
            {loading ? "Enregistrement..." : "Mettre à jour"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
