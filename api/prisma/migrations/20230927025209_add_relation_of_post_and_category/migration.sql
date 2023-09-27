-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category_id" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
