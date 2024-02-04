import prismaClient from "../prisma";

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class SignUpService {
  async execute(user: User) {
    const { username, email, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      throw new Error("Passwords don't match!");
    }

    let verifyUser = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (verifyUser) {
      throw new Error("Email already registered!");
    }

    verifyUser = await prismaClient.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    return { verifyUser };
  }
}

export { SignUpService };
