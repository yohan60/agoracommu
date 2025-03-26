// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const articleId = parseInt(id, 10);

//   if (isNaN(articleId)) {
//     return NextResponse.json({ error: "ID invalide" }, { status: 400 });
//   }

//   try {
//     // Récupérer l'article avec ses messages et l'utilisateur associé
//     const article = await prisma.article.findUnique({
//       where: { id_article: articleId },
//       include: {
//         user: { select: { username: true, roles: true } },
//         categorie: true,
//         messages: {
//           include: {
//             user: { select: { username: true, roles: true } },
//           },
//         },
//       },
//     });

//     if (!article) {
//       return NextResponse.json(
//         { error: "Article non trouvé" },
//         { status: 404 }
//       );
//     }

//     // Renvoi de l'article avec ses messages
//     return NextResponse.json(article);
//   } catch (error) {
//     console.error("Erreur lors de la récupération de l'article : ", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   const articleId = parseInt(id, 10);
//   const { message, userId } = await req.json(); // Récupération du message et de l'utilisateur

//   // Validation des données
//   if (isNaN(articleId) || !message || !userId) {
//     return NextResponse.json({ error: "Données invalides" }, { status: 400 });
//   }

//   try {
//     const newMessage = await prisma.message.create({
//       data: {
//         description_message: message,
//         id_article: articleId,
//         id_user: userId, // Assurez-vous que l'ID utilisateur est correct ici
//         created_at: new Date(),
//       },
//     });

//     return NextResponse.json(newMessage); // Retourne le message créé
//   } catch (error) {
//     console.error("Erreur lors de la création du message : ", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Exemple : où tu définis tes options next-auth

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    // Récupérer l'article avec ses messages et l'utilisateur associé
    const article = await prisma.article.findUnique({
      where: { id_article: articleId },
      include: {
        user: { select: { username: true, roles: true } },
        categorie: true,
        messages: {
          include: {
            user: { select: { username: true, roles: true } },
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    // Renvoi de l'article avec ses messages
    return NextResponse.json(article);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article : ", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const articleId = parseInt(id, 10);
  const { message } = await req.json(); // Récupération du message

  // Récupérer la session pour obtenir l'ID de l'utilisateur
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; // Assurez-vous que l'ID de l'utilisateur est dans la session

  // Validation des données
  if (isNaN(articleId) || !message || !userId) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  // Convertir l'ID de l'utilisateur en nombre si nécessaire
  const userIdAsNumber = Number(userId);

  // Vérification que la conversion en nombre a réussi
  if (isNaN(userIdAsNumber)) {
    return NextResponse.json(
      { error: "ID utilisateur invalide" },
      { status: 400 }
    );
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        description_message: message,
        id_article: articleId,
        id_user: userIdAsNumber, // Utilisation de l'ID utilisateur converti en nombre
        created_at: new Date(),
      },
    });

    return NextResponse.json(newMessage); // Retourne le message créé
  } catch (error) {
    console.error("Erreur lors de la création du message : ", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
