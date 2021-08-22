import * as jwt from "jsonwebtoken";
import envs from "../config/envs";

const generateToken = (payload: any) => {
	const exp = Date.now() / 1000 + envs.EXP_OFFSET;
	return jwt.sign(
		{
			...payload,
			exp,
		},
		envs.TOKEN_SECRET
	);
};

const verifyToken = (token: string) => jwt.verify(token, envs.TOKEN_SECRET);

const validateToken = (token: string) => {
	if (!token) throw new Error("Access denied!!! Auth token required.");

	const [tokenType, tkn] = token.split(" ");

	if (tokenType !== "Bearer")
		throw new Error("Access denied!!! Invalid token type.");

	if (tkn.split(".").length !== 3)
		throw new Error("Access denied!!! Invalid token.");

	return tkn;
};

export default { generateToken, verifyToken, validateToken };
