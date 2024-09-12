import { injectable, inject } from 'inversify';
import { UserRepository } from '../repositories/user.repository';
import db from '../models/knex';

@injectable()
export class UserService {
	constructor(
		@inject(UserRepository) private userRepository: UserRepository
	) {}

	async getUserById(userId: string) {
		const user = await this.userRepository.getUserById(userId);
		if (!user) {
			throw new Error(`User with ID ${userId} not found`);
		}
		return user;
	}

	async getUserByTelegramId(tg_id: string) {
		const user = await this.userRepository.getUserByTelegramId(tg_id);
		return user;
	}

	async createUser(tg_id: string, user_name: string) {
		const [user] = await db('users')
			.insert({ tg_id: tg_id, user_name })
			.returning('*');

		return user;
	}
}
