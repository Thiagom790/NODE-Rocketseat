import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepositoy: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Usuário existe
        const user = await this.userRepositoy.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        // Gerar jsonwebtokem
        // posso na chave coloar uma gerado pelo gerador de md5
        const token = sign({}, "2d71a769cdef9ee21a1674d12cc09fbb", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenResponse: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenResponse;
    }
}

export { AuthenticateUserUseCase };
