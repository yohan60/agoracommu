import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Suppression d'un article
export async function DELETE(req: Request) {
  try {
    // Extraire l'ID de l'URL
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    if (!id) {
      console.error("ID non fourni");
      return NextResponse.json(
        { error: "ID d'article non fourni" },
        { status: 400 }
      );
    }

    const articleId = parseInt(id);

    if (isNaN(articleId)) {
      console.error("ID invalide:", id);
      return NextResponse.json(
        { error: "ID d'article invalide" },
        { status: 400 }
      );
    }

    // Supprimer l'article avec la suppression des messages en cascade
    const deletedArticle = await prisma.article.delete({
      where: {
        id_article: articleId,
      },
    });

    return NextResponse.json(deletedArticle);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return NextResponse.json(
      {
        error: "Erreur interne du serveur lors de la suppression de l'article",
      },
      { status: 500 }
    );
  }
}