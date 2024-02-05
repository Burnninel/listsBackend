import { Request, Response } from "express";
import { SignInService } from "../services/SignInService";

class SignInController {
  async handle(request: Request, response: Response) {
    const user = request.body;

    const service = new SignInService();
    try {
      const result = await service.execute(user);
      response.json(result);
      console.log(result);
    } catch (error: any) {
        if(error.message === 'Email invalid!') {
            return response.json(error.message)
        }   
        if(error.message === 'Password invalid!') {
            return response.json(error.message)
        }
    }
  }
}

export { SignInController };
