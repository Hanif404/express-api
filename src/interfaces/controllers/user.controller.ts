import { Request, Response } from "express";
import { UserUseCase } from "../../usecase/user/user.usecase";
import { UserRepository } from "../../domain/repositories-impl/user.repository.impl";
import MessageError from "../../utils/error/MessageError";
import status from "http-status";

const userUseCase = new UserUseCase(new UserRepository());

export class UserController {
  static async list(req: Request, res: Response) {
    try {
      const user = await userUseCase.list();
      res.success(user.data, user.meta, 'Success get list');
    } catch (err: any) {
      throw new MessageError({
        statusCode: status.INTERNAL_SERVER_ERROR,
        code: "ERR_INTERNAL_SERVER",
        message: err.message
      })
    }
  }

  static async show(req: Request, res: Response) {
    res.json({ message: "show" });
    // try {
    //   const data = await userUseCase.login(req.body.email, req.body.password);
    //   res.json(data);
    // } catch (err: any) {
    //   res.status(401).json({ error: err.message });
    // }
  }

  static async update(req: Request, res: Response) {
    res.json({ message: "update" });
    // try {
    //   const data = await userUseCase.update(req.body.email, req.body.password);
    //   res.json(data);
    // } catch (err: any) {
    //   res.status(401).json({ error: err.message });
    // }
  }
}