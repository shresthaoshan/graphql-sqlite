import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserDomain } from "./user.domain";
import { UserEntity } from "./user.entity";
import { User, UserInput } from "./user.types";

@Resolver()
export class UserResolver {
	constructor(private readonly domain = new UserDomain()) {}

	@Query(() => [UserEntity])
	getAllUsers() {
		return this.domain.all();
	}

	@Mutation(() => UserEntity)
	registerUser(@Arg("user", () => UserInput) user: User) {
		return this.domain.create(user);
	}
	@Mutation(() => Boolean)
	deleteUser(@Arg("id") id: string) {
		return this.domain.delete(id);
	}
}
