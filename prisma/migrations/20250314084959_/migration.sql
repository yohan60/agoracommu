/*
  Warnings:

  - You are about to drop the `Appartenir` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_categorie` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appartenir" DROP CONSTRAINT "Appartenir_id_article_fkey";

-- DropForeignKey
ALTER TABLE "Appartenir" DROP CONSTRAINT "Appartenir_id_categorie_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "id_categorie" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Appartenir";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id_categorie") ON DELETE RESTRICT ON UPDATE CASCADE;
