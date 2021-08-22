import type { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";

import { CustomError } from "../utils/CustomError";
import { authChecker } from "../modules/auth/auth.checker";

import { UserResolver } from "../modules/user/user.resolver";
import { AuthResolver } from "../modules/auth/auth.resolver";

export const initGraphQl = async (app: Express): Promise<void> => {
	console.log("GRAPHQL:: Configuring...");

	const schema = await buildSchema({
		resolvers: [UserResolver, AuthResolver],
		emitSchemaFile: false,
		authChecker,
	});

	const graphql = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginLandingPageDisabled(),
			ApolloServerPluginLandingPageGraphQLPlayground(),
		],
		context: ({ req }) => {
			let ctx: any = { req };
			const token = req?.headers?.authorization || null;
			if (token) ctx = { ...ctx, token };
			return ctx;
		},
		formatError: (err) => {
			return new CustomError(err);
		},
	});

	await graphql.start();

	graphql.applyMiddleware({ app });

	console.log("GRAPHQL:: Configured and initiated.");
};
