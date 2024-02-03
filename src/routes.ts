import { Router } from "express"
import { LoginGoogleController } from './controllers/LoginGoogleController'

const router = Router()

router.post("/loginGoogle", new LoginGoogleController().handle)

export { router }