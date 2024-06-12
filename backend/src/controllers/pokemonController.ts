import { NextFunction, Request, Response } from "express";
import { pokemonService } from "../services/pokemonService";
import { jwtService } from "../services/JWTService";

export const pokemonController = {
  async getCatchedPokemons(
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
  ) {
    const token: string = req.headers["authorization"] as string;
    const verifiedUser = jwtService.getUserIdFromToken(token);

    await pokemonService
      .getCatchedPokemons(verifiedUser.userId)
      .then((resp) => {
        return res.json(resp);
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async catchPokemons(
    req: Request<any>,
    res: Response<any>,
    next: NextFunction
  ) {
    const token: string = req.headers["authorization"] as string;
    const verifiedUser = jwtService.getUserIdFromToken(token);

    const input = {
      id: req.body.id as string[],
      userId: verifiedUser.userId as string,
    };

    await pokemonService
      .catchPokemons(input.id, input.userId)
      .then((resp) => {
        return res.json(resp);
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },
};
