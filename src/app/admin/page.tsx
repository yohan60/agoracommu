"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Si tu utilises next-auth pour l'authentification
import Link from "next/link";

const AdminPage = () => {
  const { data: session, status } = useSession(); // Récupérer la session de l'utilisateur
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      const user = session?.user;
      if (user && user.roles === "Admin") {
        // Si l'utilisateur a le rôle "Admin", on récupère la liste des utilisateurs
        fetchUsers(); // Appel à la fonction pour récupérer les utilisateurs
      } else {
        // Si l'utilisateur n'a pas le rôle "Admin", on le redirige
        window.location.href = "/"; // Redirige vers la page d'accueil ou autre
      }
    }
  }, [session, status]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      const data = await response.json();

      // Trie les utilisateurs d'abord par rôle (Admin en premier), puis par date de création (du plus ancien au plus récent)
      data.sort(
        (
          a: { roles: string; created_at: string | number | Date },
          b: { roles: string; created_at: string | number | Date }
        ) => {
          // Trier d'abord par rôle (Admin en premier)
          if (a.roles === "Admin" && b.roles !== "Admin") return -1;
          if (a.roles !== "Admin" && b.roles === "Admin") return 1;

          // Ensuite, trier par date de création (du plus ancien au plus récent)
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
      );

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const banUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/admin/admin-users?id=${userId}`, {
        method: "DELETE", // Méthode DELETE pour bannir l'utilisateur
      });

      if (response.ok) {
        console.log(`Utilisateur ${userId} banni avec succès`);
        fetchUsers(); // Recharger la liste des utilisateurs après avoir banni un utilisateur
      } else {
        console.error("Erreur lors du bannissement de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur réseau", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center overflow-y-auto pt-20 mb-6">
      {/* Bouton Retour en dehors de la div principale */}
      <div className="w-[90%] md:w-[80%] mx-auto mb-6 mt-4 md:mt-0">
        <Link
          href="/"
          className="w-32 md:w-36 px-3 md:px-4 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold block text-center text-[12px] md:text-[14px]"
        >
          Retour
        </Link>
      </div>

      {/* Contenu principal */}
      <div className="w-[90%] md:w-[80%] h-auto mx-auto p-6 md:p-10 bg-gray-800 text-white shadow-md rounded-md border">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Page d'administration
        </h1>

        {/* Barre blanche */}
        <span className="block w-full h-1 bg-white my-4 mt-6 md:mt-10 mb-6 md:mb-10"></span>

        {users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id_user}
                className="flex flex-col md:flex-row md:justify-between items-center p-4 bg-gray-700 rounded-md"
              >
                <div className="flex flex-col text-center md:text-left">
                  <span className="font-semibold text-sm md:text-base">
                    ID: {user.id_user} : {user.username} - {user.roles}
                  </span>
                  <span className="font-semibold text-xs md:text-sm text-gray-300">
                    {user.email}
                  </span>
                  <span className="font-semibold text-xs md:text-sm text-gray-400">
                    Créé le: {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => banUser(user.id_user)}
                  className="mt-3 md:mt-0 md:ml-2 bg-red-500 text-white px-3 md:px-4 py-2 rounded-md hover:bg-red-600 text-sm md:text-base"
                >
                  Bannir
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 text-sm md:text-base">
            Aucun utilisateur trouvé.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;