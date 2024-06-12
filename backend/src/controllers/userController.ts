import { NextFunction, Request, Response } from "express";
import IRegisterUserRequest from "../models/RequestModels/IRegisterUserRequest";
import IRegisterUserViewModel from "../models/ViewModels/IRegisterUserViewModel";
import { loginService, registerService } from "../services/userService";
import IUserDomainModel from "../models/DomainModels/IUserDomainModel";
import ILoginUserRequest from "../models/RequestModels/ILoginUserRequest";
import { ILoginViewModel } from "../models/ViewModels/ILoginViewModel";
import { jwtService } from "../services/JWTService";

export const userController = {
  async registerUser(
    req: Request<IRegisterUserRequest>,
    res: Response<IRegisterUserViewModel>,
    next: NextFunction
  ) {
    const newRegistration: IRegisterUserRequest = {
      email: req.body.email,
      userName: req.body.username,
      password: req.body.password,
    };

    await registerService
      .registerUser(newRegistration)
      .then(() => {
        return res.status(202).json({
          status: 202,
          message: "Sikeres regisztráció",
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },

  async login(
    req: Request<ILoginUserRequest>,
    res: Response<ILoginViewModel>,
    next: NextFunction
  ) {
    const newLogin: ILoginUserRequest = {
      email: req.body.email,
      password: req.body.password,
    };

    await loginService
      .login(newLogin)
      .then(async (userData: IUserDomainModel) => {
        const jwtToken = await jwtService.generateAccessToken(
          userData.id,
          userData.username
        );

        return res.status(202).json({
          status: 202,
          token: jwtToken,
          username: userData.username,
        });
      })
      .catch((err) => {
        console.log(err);
        next(err);
        return;
      });
  },
};
