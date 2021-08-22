import { Request } from "express";
import { AuthChecker } from "type-graphql";
import { UserEntity } from "../user/user.entity";
import token from "../../utils/token";

interface ContextType {
	req: Request;
	token: string;
	user: UserEntity;
}

export const authChecker: AuthChecker<ContextType> = ({ context }, roles) => {
	const tkn = context.token;

	const _tkn = token.validateToken(tkn);
	const user = token.verifyToken(_tkn) as UserEntity;
	if (!user) throw new Error("Access denied!!! Token could not be verified.");

	context.user = user;

	return true;
};
