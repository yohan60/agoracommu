/*
  Warnings:

  - You are about to drop the column `id_notification` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_notification_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_id_user_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "id_notification";

-- DropTable
DROP TABLE "Notification";
