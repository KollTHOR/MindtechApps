import { prisma } from "../data/connection";
import IUserDomainModel from "../models/DomainModels/IUserDomainModel";
import ILoginUserRequest from "../models/RequestModels/ILoginUserRequest";
import IRegisterUserRequest from "../models/RequestModels/IRegisterUserRequest";
import { passwordService } from "./passwordService";

export const registerService = {
  async registerUser(register: IRegisterUserRequest): Promise<any> {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: register.email,
      },
    });

    if (existingUser?.email) {
      return Promise.reject({
        message: "Ezzel az email-el már regisztráltak!",
        status: 401,
      });
    }

    return await prisma.user.create({
      data: {
        email: register.email,
        username: register.userName,
        password: passwordService.generateHash(register.password),
      },
    });
  },
};

export const loginService = {
  async login(user: ILoginUserRequest): Promise<IUserDomainModel> {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) {
      return Promise.reject({
        message: "Hibás e-mail!",
        status: 401,
      });
    }

    const passwordIsTheSame: boolean = passwordService.comparePasswords(
      user.password,
      existingUser.password
    );

    if (!passwordIsTheSame) {
      return Promise.reject({
        message: "Hibás jelszó!",
        status: 401,
      });
    }

    return existingUser;
  },
};
