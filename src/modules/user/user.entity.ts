import { User } from "./user.types";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class UserEntity extends BaseEntity implements Partial<User> {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	@Field()
	firstName: string;

	@Column()
	@Field()
	lastName: string;

	@Column({
		unique: true,
	})
	@Field()
	phone: string;

	@Column()
	password: string;

	@Field({ complexity: 3 })
	fullName(@Root() user: UserEntity): string {
		return `${user.firstName} ${user.lastName}`;
	}
}
