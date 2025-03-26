import ProfilDetails from "@/components/ProfilPage/ProfilDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Assure-toi que ce chemin est correct
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Fonction pour récupérer l'utilisateur depuis la base de données
const getUser = async (id: number) => {
  console.log("Recherche utilisateur avec ID :", id);

  const user = await prisma.user.findUnique({
    where: { id_user: id },
    select: {
      id_user: true,
      username: true,
      image: true,
      description: true,
    },
  });

  console.log("Utilisateur trouvé :", user);
  return user;
};

// Page du profil, récupérer l'utilisateur connecté
const ProfilPage = async () => {
  // Récupérer la session de l'utilisateur connecté
  const session = await getServerSession(authOptions);
  console.log("Session récupérée :", session);

  // Vérifier si l'utilisateur est connecté
  if (!session || !session.user) {
    return (
      <p className="text-center text-red-500">Utilisateur non authentifié</p>
    );
  }

  // Récupérer l'ID de l'utilisateur depuis la session
  const userId = parseInt(session.user.id as string); // Assure-toi que l'ID est un nombre
  const user = await getUser(userId); // Récupérer l'utilisateur avec Prisma

  if (!user) {
    return <p className="text-center text-red-500">Utilisateur non trouvé.</p>;
  }

  // Rendu de la page avec les informations de l'utilisateur
  return (
    <div className="w-[90%] md:w-[70%] h-auto mx-auto shadow-lg rounded-[5px] border border-white bg-gray-900 p-6 md:p-10">
      <ProfilDetails
        username={user.username}
        image={user.image}
        description={user.description ?? "Aucune description"}
      />

      {/* Boutons */}
      <div className="flex justify-center items-center gap-4 mt-10 flex-col md:flex-row">
        <Link
          href="/profil/modifprofil"
          className="w-full md:w-48 px-4 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold text-center text-[14px]"
        >
          Modifier le profil
        </Link>
        <Link
          href="/profil/modifmdp"
          className="w-full md:w-48 px-4 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold text-center text-[14px]"
        >
          Modifier mot de passe
        </Link>
      </div>
    </div>
  );
};

export default ProfilPage;
