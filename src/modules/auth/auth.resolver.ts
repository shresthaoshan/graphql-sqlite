import { Arg, Query, Resolver } from "type-graphql";
import { AuthInput, AuthResponse } from "./auth.types";
import { AuthDomain } from "./auth.domain";
import token from "../../utils/token";
import { UserEntity } from "../user/user.entity";

@Resolver()
export class AuthResolver {
	constructor(private readonly domain = new AuthDomain()) {}

	@Query(() => AuthResponse)
	async getToken(@Arg("credentials") credentials: AuthInput) {
		const { phoneNumber, password } = credentials;

		const user = (await this.domain.match(phoneNumber, password)) as any;

		delete user.password;

		return { token: token.generateToken(user) };
	}

	@Query(() => UserEntity)
	verifyToken(@Arg("token") tk: string) {
		return token.verifyToken(tk);
	}
}
