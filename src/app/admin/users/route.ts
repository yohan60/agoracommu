// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assure-toi que tu as un client Prisma configuré

export async function GET() {
  try {
    // Récupérer tous les utilisateurs dans la base de données
    const users = await prisma.user.findMany({
      select: {
        id_user: true,
        username: true,
        email: true,
        roles: true, // Inclure le rôle de chaque utilisateur
      },
    });

    return NextResponse.json(users); // Retourner les utilisateurs
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
