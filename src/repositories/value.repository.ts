import { knex } from 'knex';
import { injectable } from 'inversify';

@injectable()
export class ValueRepository {
	async saveValue(userId: number, value: string, expiresAt: string) {
		return knex('values').insert({
			user_id: userId,
			value,
			expires_at: expiresAt,
		});
	}

	async getValue(userId: number) {
		return knex('values').where({ user_id: userId }).first();
	}

	async getExpiredValues() {
		return knex('values').where(
			'expires_at',
			'<',
			new Date().toISOString()
		);
	}

	async deleteValue(userId: number) {
		return knex('values').where({ user_id: userId }).del();
	}
}
