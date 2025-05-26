import { User } from "../entities/user.entities";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<any>;
  findById(id: number): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  update(user: Partial<User>): Promise<User>;
}