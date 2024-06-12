import { prisma } from "../data/connection";

export const pokemonService = {
  async getCatchedPokemons(userId: string): Promise<any> {
    return await prisma.cachedPokemons.findMany({
      where: {
        userId,
      },
    });
  },

  async catchPokemons(id: string[], userId: string): Promise<any> {
    const pokemons = id.map((e) => ({
      id: e,
      userId: userId,
    }));
    return await prisma.cachedPokemons.createMany({
      data: pokemons,
    });
  },
};
