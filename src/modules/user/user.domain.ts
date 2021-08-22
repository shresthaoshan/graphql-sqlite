import { UserEntity } from "./user.entity";
import { User } from "./user.types";

export class UserDomain {
	constructor(private readonly entity = UserEntity) {}

	one(id: number) {
		return this.entity.findOne(id);
	}
	all() {
		return this.entity.find();
	}
	create(user: User) {
		return this.entity.create(user).save();
	}
	async delete(id: string) {
		await this.entity.delete({ id });
		return true;
	}
}
