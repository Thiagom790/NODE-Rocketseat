import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // no header tem que ter o token ai o modelo é "Bearer token"
    // Bearer jasjfslfdjlskdfs

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        // O verify gera um erro
        const { sub: user_id } = verify(
            token,
            "2d71a769cdef9ee21a1674d12cc09fbb"
        ) as IPayload;

        const userRepositoy = new UserRepository();
        const user = await userRepositoy.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists", 401);
        }

        request.user = {
            id: user.id,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
