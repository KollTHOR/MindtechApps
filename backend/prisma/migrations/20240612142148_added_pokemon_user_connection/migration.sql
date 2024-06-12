-- AlterTable
ALTER TABLE "CachedPokemons" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "CachedPokemons" ADD CONSTRAINT "CachedPokemons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
