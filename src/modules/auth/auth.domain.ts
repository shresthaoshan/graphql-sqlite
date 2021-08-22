import { verifyPassword } from "../../utils/password";
import { UserDomain } from "../user/user.domain";

export class AuthDomain extends UserDomain {
	async match(phone: string, password: string) {
		const user = await this.filterOne({ phone });
		if (!user) throw new Error("User does not exist: " + phone);

		if (!verifyPassword(user.password, password))
			throw new Error("Credentials do not match.");

		return user;
	}
}
