-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_article_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_article_fkey" FOREIGN KEY ("id_article") REFERENCES "Article"("id_article") ON DELETE CASCADE ON UPDATE CASCADE;
