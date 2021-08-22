import { Field, InputType } from "type-graphql";

export interface User {
	firstName: string;
	lastName: string;
	phone: string;
	password: string;
}

@InputType()
export class UserInput implements User {
	@Field()
	firstName: string;
	@Field()
	lastName: string;
	@Field()
	phone: string;
	@Field()
	password: string;
}
