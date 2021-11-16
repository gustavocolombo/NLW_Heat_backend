import { Router } from "express";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateMessageController from "./controllers/CreateMessageController";

const routes = Router();

routes.post("/authenticate", new AuthenticateUserController().handle);
routes.post("/messages", new CreateMessageController().handle);

export default routes;
