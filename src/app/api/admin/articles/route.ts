import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Récupération des articles (GET)
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        user: true,
        categorie: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.error();
  }
}