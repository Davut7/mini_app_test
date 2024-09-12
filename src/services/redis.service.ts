import Redis from 'ioredis';
import { injectable } from 'inversify';

@injectable()
export class RedisService {
	private client: Redis;

	constructor() {
		this.client = new Redis({
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT),
		});
	}

	async set(key: string, value: string, expiresAt: string) {
		await this.client.set(key, value);
		await this.client.expireat(key, new Date(expiresAt).getTime() / 1000);
	}

	async get(key: string) {
		return await this.client.get(key);
	}

	async delete(key: string) {
		await this.client.del(key);
		console.log(`Deleted key ${key} from Redis`);
	}
}
