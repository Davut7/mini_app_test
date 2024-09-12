import { injectable } from 'inversify';
import db from '../models/knex';

@injectable()
export class UserRepository {
	async getUserById(userId: string) {
		return db('users').where('id', userId).first();
	}

	async getUserByTelegramId(tg_id: string) {
		return db('users').where({ tg_id: tg_id }).first();
	}
}
