import { GraphQLError } from "graphql";

export class CustomError extends GraphQLError {
	constructor(err: GraphQLError) {
		super(err.message);
	}
}
