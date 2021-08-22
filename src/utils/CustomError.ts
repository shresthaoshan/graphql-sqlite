import { GraphQLError } from "graphql";

const ALREADY_EXIST_CONDITION = "UNIQUE constraint failed";

export class CustomError extends GraphQLError {
	constructor(err: GraphQLError) {
		let message = "";

		if (err.message.includes(ALREADY_EXIST_CONDITION))
			message = "Record with data provided already exists.";
		else if (err.message === "jwt expired")
			message = "Token has expired. Re-authenticate.";

		super(message.length ? message : err.message);
	}
}
