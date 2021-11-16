import { Request, Response } from "express";
import CreateMessageService from "../services/CreateMessageService";

export default class CreateMessageController {
  async handle(request: Request, response: Response): Promise<any> {
    const { message } = request.body;
    const { user_id } = request;

    const service = new CreateMessageService();
    const newMesssage = await service.execute(message, user_id);

    return newMesssage;
  }
}
