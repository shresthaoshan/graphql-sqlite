import { sha512 } from "hash.js";
import envs from "../config/envs";

export const hashPassword = (password: string) =>
	sha512()
		.update(envs.SALT + password)
		.digest("hex");

export const verifyPassword = (hashed, password) =>
	hashed === hashPassword(password);
