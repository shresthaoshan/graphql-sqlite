import { createConnection } from "typeorm";

export const initDatabase = async () => {
	console.log("DATABASE:: Connecting...");

	await createConnection();

	console.log("DATABASE:: Connected.");
};
