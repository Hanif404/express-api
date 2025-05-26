import { IUserRepository } from "../../domain/repositories/user.repository";

export class UserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async list() {
    return await this.userRepo.findAll();
  }
}