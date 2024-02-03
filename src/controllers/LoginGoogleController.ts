import { Request, Response } from "express";
import { LoginGoogleService } from "../services/LoginGoogleService";

class LoginGoogleController {
  async handle(request: Request, response: Response) {
    const token = request.body.user.stsTokenManager.accessToken;

    const service = new LoginGoogleService();
    try {
      const result = await service.execute(token);
      return response.json({ result});
    } catch (error) {
      return response.json({ error: error });
    }
  }
}

export { LoginGoogleController };
