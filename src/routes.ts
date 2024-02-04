import { Router } from "express";
import { LoginGoogleController } from "./controllers/LoginGoogleController";
import { SignUpController } from "./controllers/SignUpController";

const router = Router();

router.post("/loginGoogle", new LoginGoogleController().handle);

router.post("/signup", new SignUpController().handle);

export { router };