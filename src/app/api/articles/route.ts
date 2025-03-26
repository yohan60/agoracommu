import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Récupérer la session via getServerSession
    const session = await getServerSession(authOptions);

    // Vérifier si l'utilisateur est authentifié
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    // Convertir l'ID utilisateur en number (car Prisma attend un number)
    const userId = parseInt(session.user.id, 10);

    // Vérifier si la conversion a échoué (cas où l'ID utilisateur n'est pas valide)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "ID utilisateur invalide" },
        { status: 400 }
      );
    }

    // Récupérer les données de l'article depuis la requête JSON
    const { titre_article, description_article, id_categorie, image_article } =
      await request.json();

    // Limiter la longueur de la description à 500 caractères
    const truncatedDescription =
      description_article.length > 500
        ? description_article.slice(0, 500) + "..."
        : description_article;

    // Créer un nouvel article en utilisant l'ID de l'utilisateur depuis la session
    const newArticle = await prisma.article.create({
      data: {
        titre_article,
        description_article,
        id_categorie: parseInt(id_categorie), // Assurez-vous que id_categorie est un nombre
        id_user: userId, // Utiliser l'ID de l'utilisateur converti en number
        image_article: image_article || null, // Si aucune image, définir null
      },
    });

    // Retourner la réponse avec le nouvel article créé
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Récupérer tous les articles avec leurs catégories
    const articles = await prisma.article.findMany({
      include: {
        categorie: true, // Inclure la catégorie associée à chaque article
      },
    });

    // Retourner les articles sous forme de réponse JSON
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des articles", error);
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la récupération des articles",
      }),
      { status: 500 }
    );
  }
}
