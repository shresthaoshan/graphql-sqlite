import * as dotenv from "dotenv";

(() => {
	const envs = dotenv.config();

	if (envs.error) throw new Error("Environment variables not set yet.");
})();
