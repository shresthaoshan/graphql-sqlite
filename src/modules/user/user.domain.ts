import { hashPassword } from "../../utils/password";
import { UserEntity } from "./user.entity";
import { User } from "./user.types";

export class UserDomain {
	constructor(private readonly entity = UserEntity) {}

	one(id: number) {
		return this.entity.findOne(id);
	}
	filterOne(payload: any) {
		return this.entity.findOne({ ...payload });
	}
	all() {
		return this.entity.find();
	}
	create(user: User) {
		return this.entity
			.create({ ...user, password: hashPassword(user.password) })
			.save();
	}
	async delete(id: string) {
		await this.entity.delete({ id });
		return true;
	}
}
