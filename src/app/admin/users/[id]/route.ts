// app/api/admin/users/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assure-toi que tu as un client Prisma configuré

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // On bannit un utilisateur en mettant à jour son rôle à "Banni"
    const user = await prisma.user.update({
      where: { id_user: parseInt(id, 10) },
      data: { roles: "Banni" }, // Mettre à jour le rôle de l'utilisateur
    });

    return NextResponse.json(user); // Retourne l'utilisateur mis à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
