import { Request, Response } from "express";
import { SignInService } from "../services/SignInService";

class SignInController {
  async handle(request: Request, response: Response) {
    const user = request.body;

    const service = new SignInService();
    try {
      const result = await service.execute(user);
      response.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Email invalid!") {
        return response.status(401).json(error.message);
      }
      if (error.message === "Password invalid!") {
        return response.status(401).json(error.message);
      }
    }
  }
}

export { SignInController };
