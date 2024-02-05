import prismaClient from "../prisma";
import jwt from "jsonwebtoken";

interface User {
  email: string;
  password: string;
}

class SignInService {
  async execute(user: User) {
    const { email, password } = user;

    const getUser = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!getUser) {
      throw new Error("Email invalid!");
    }

    if (password !== getUser?.password) {
      throw new Error("Password invalid!");
    }

    const { id, username } = getUser;

    const token = jwt.sign(
      {
        username,
        email,
      },
      process.env.SECRET_ACCESS_TOKEN,
      { subject: id, expiresIn: "6h" }
    );

    return { token };
  }
}

export { SignInService };
