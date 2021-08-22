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

export default { generateToken, verifyToken };
