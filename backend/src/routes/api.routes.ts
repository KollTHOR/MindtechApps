import express from "express";
import cors from "cors";
import tokenAuthentication from "../middlewares/tokenAuthentication";
import { userController } from "../controllers/userController";
import { pokemonController } from "../controllers/pokemonController";

const apiRouter = express.Router();
apiRouter.use(cors());
apiRouter.use(express.json());

//Auth
apiRouter.post("/register", userController.registerUser);
apiRouter.post("/login", userController.login);

// apiRouter.route("/logout").get(tokenAuthentication());
// apiRouter.post("/logout", userController.logoutUser);

//Pokemon
apiRouter.route("/getCatchedPokemons").get(tokenAuthentication());
apiRouter.get("/getCatchedPokemons", pokemonController.getCatchedPokemons);
apiRouter.route("/catchPokemons").post(tokenAuthentication());
apiRouter.post("/catchPokemons", pokemonController.catchPokemons);

export default apiRouter;
