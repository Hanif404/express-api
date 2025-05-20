import prisma from "../config/prisma";
import { IUserRepository } from "../domain/repositories/user.interface";
import { User } from "../domain/entities/user.entities";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    return await prisma.user.create({ data: user });
  }
}