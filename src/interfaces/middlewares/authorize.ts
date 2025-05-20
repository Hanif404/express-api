import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import status from "http-status";
import prisma from "../../config/prisma";

export const authorize = (permissions: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(status.UNAUTHORIZED);
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
      req.user = { id: decoded.id };

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        include: {
          roles: { include: { permissions: true } },
          permissions: true,
        },
      });

      if (!user) return res.sendStatus(status.FORBIDDEN);

      const userPerms = new Set([
        ...user.permissions.map((p: { name: any; }) => p.name),
        ...user.roles.flatMap((r: { permissions: any[]; }) => r.permissions.map((p: { name: any; }) => p.name)),
      ]);

      const hasPerm = permissions.every(p => userPerms.has(p));
      if (!hasPerm) return res.sendStatus(status.FORBIDDEN);

      next();
    } catch (err) {
      res.status(status.UNAUTHORIZED).json({ error: status[401] });
    }
  };
};