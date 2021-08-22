import type { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";

import { UserResolver } from "../modules/user/user.resolver";
import { CustomError } from "../utils/CustomError";

export const initGraphQl = async (app: Express): Promise<void> => {
	console.log("GRAPHQL:: Configuring...");

	const schema = await buildSchema({
		resolvers: [UserResolver],
		emitSchemaFile: false,
	});

	const graphql = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginLandingPageDisabled(),
			ApolloServerPluginLandingPageGraphQLPlayground(),
		],
		formatError: (err) => {
			return new CustomError(err);
		},
	});

	await graphql.start();

	graphql.applyMiddleware({ app });

	console.log("GRAPHQL:: Configured and initiated.");
};
