import { GraphQLError } from "graphql";

const ALREADY_EXIST_CONDITION = "UNIQUE constraint failed";

export class CustomError extends GraphQLError {
	constructor(err: GraphQLError) {
		if (err.message.includes(ALREADY_EXIST_CONDITION))
			super("Record with data provided already exists.");
		else super(err.message);
	}
}
