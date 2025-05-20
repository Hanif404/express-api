import { IUserRepository } from "../../domain/repositories/user.interface";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";

export class AuthUseCase {
  constructor(private userRepo: IUserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    return { token: generateToken(user.id) };
  }

  async register(data: { name: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.userRepo.create({ ...data, password: hashed });
  }
}