import { prisma, Prisma } from "../../config/prisma";
import { IUserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entities";
import PaginateService from "../services/paginate.service";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<any> {
    const paginateService = new PaginateService<Prisma.ModelName>();
    return await paginateService.paginate({
      modelName: 'User',
      select:{
        id:true,
        email:true,
        name:true,
        RoleUser:{
          select:{
            role:{
              select:{
                name:true
              }
            }
          }
        }
      },
      page:"1",
      pageSize:"10",
    })
  }

  async create(user: Partial<User>): Promise<User> {
    const userData: Prisma.UserCreateInput = {
      email: user.email!,
      name: user.name!,
      password: user.password!,
      RoleUser: {
        create: {
          role: {
            connect: {
              id: 2,
            },
          },
        },
      },
    };
    
    return await prisma.user.create({ data: userData });
  }

  async update(user: Partial<User>): Promise<User> {
    const userData: Prisma.UserUpdateInput = {
      name: user.name!,
      updatedAt : new Date(),
    };
    
    return await prisma.user.update({ data: userData, where: { id: user.id! }});
  }
}