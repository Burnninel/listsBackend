import { Request, Response } from "express";
import { SignUpService } from "../services/SignUpService";

class SignUpController {
  async handle(request: Request, response: Response) {
    const user = request.body;

    const service = new SignUpService();
    try {
      const result = await service.execute(user);
      return response.status(200).json(result);
    } catch (error: any) {
      if (error) {
        if (error.message === "Passwords don't match!") {
          return response.status(401).json({ error: error.message });
        }
        if (error.message === "Email already registered!") {
          return response.status(401).json({ error: error.message });
        }
      }
    }
  }
}

export { SignUpController };
