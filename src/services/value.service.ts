import { injectable, inject } from 'inversify';
import { ValueRepository } from '../repositories/value.repository';
import { RedisService } from './redis.service';

@injectable()
export class ValueService {
	constructor(
		@inject(ValueRepository) private valueRepository: ValueRepository,
		@inject(RedisService) private redisService: RedisService
	) {}

	async saveValue(user: any, value: string, expiresAt: string) {
		await this.redisService.set(user.id, value, expiresAt);
		await this.valueRepository.saveValue(user.id, value, expiresAt);
	}

	async getValue(user: any) {
		const cachedValue = await this.redisService.get(user.id);
		if (cachedValue) return cachedValue;

		const value = await this.valueRepository.getValue(user.id);
		if (value) await this.redisService.set(user.id, value, '1m');
		return value;
	}

	async removeExpiredValues() {
		const expiredValues = await this.valueRepository.getExpiredValues();

		for (const expired of expiredValues) {
			await this.redisService.delete(expired.user_id);
			await this.valueRepository.deleteValue(expired.user_id);
		}

		console.log(`Removed ${expiredValues.length} expired values`);
	}
}
