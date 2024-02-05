import { Router } from "express";
import { LoginGoogleController } from "./controllers/LoginGoogleController";
import { SignUpController } from "./controllers/SignUpController";
import { SignInController } from "./controllers/SignInController";

const router = Router();

router.post("/loginGoogle", new LoginGoogleController().handle);

router.post("/signup", new SignUpController().handle);

router.post("/signin", new SignInController().handle);

export { router };