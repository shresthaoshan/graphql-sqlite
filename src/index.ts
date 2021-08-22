import "reflect-metadata";
import "./config";
import * as express from "express";
import { version } from "../package.json";
import { initGraphQl } from "./loaders/graphql";
import { initDatabase } from "./loaders/database";

(async () => {
	try {
		console.log("SERVER:: Starting...");

		const app = express();

		await initDatabase();
		await initGraphQl(app);

		app.get("/", (_, res) => {
			res.send("v" + version);
		});

		app.listen(process.env.PORT || 3011, () => {
			console.log("SERVER:: Started.");
		});
	} catch (ex) {
		console.error(ex);
		console.log("SERVER:: Exception occurred. Aborting...");
		process.exitCode = 1;
		process.exit();
	}
})();
