import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class AuthInput {
	@Field()
	phoneNumber: string;
	@Field()
	password: string;
}

@ObjectType()
export class AuthResponse {
	@Field()
	token: string;
}
