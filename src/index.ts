import 'reflect-metadata';
import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import dotenv from 'dotenv';
import knex from 'knex';
import Redis from 'ioredis';
import dbConfig from './models/knexfile';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { ValueController } from './controllers/value.controller';
import { AuthMiddleware, isJwtPayloadDto } from './middlewares/auth.middleware';
import { container } from './config/inversify';
import { bearer } from '@elysiajs/bearer';
import * as jwt from 'jsonwebtoken';
import { env } from './config/env.config';
import { JwtPayloadDto } from './dto/jwtPayload.dto';
import { cookie } from '@elysiajs/cookie';

dotenv.config();

const redis = new Redis({
	host: process.env.REDIS_HOST!,
	port: Number(process.env.REDIS_PORT),
});

const db = knex(dbConfig);

const port = process.env.PORT!;
const apiVersion = process.env.API_VERSION!;

const app = new Elysia({ prefix: '/api' })
	.use(
		swagger({
			autoDarkMode: true,
			path: '/docs',
			scalarConfig: { theme: 'purple' },
			documentation: {
				security: [{ JwtAuth: [], BearerAuth: [] }],
				info: {
					title: 'Telegram web app API documentation',
					contact: { name: 'Telegram', url: 'https://t.me/Davut_7' },
					version: apiVersion,
				},
				tags: [
					{
						name: 'Authorization',
						description: 'Authorization related routes',
					},
					{
						name: 'Endpoint',
						description: 'Endpoint to store and retrieve values',
					},
				],
			},
		})
	)
	.use(cookie())
	.use(bearer());

const authController = container.get(AuthController);
const userController = container.get(UserController);
const valueController = container.get(ValueController);

app.post('/v1/tg-login', authController.login, {
	body: t.Object({
		tg_id: t.String(),
		user_name: t.String(),
	}),
});
app.get('/v1/me', AuthMiddleware, userController.getMe);
app.post('/v1/endpoint', AuthMiddleware, valueController.saveValue);
app.get('/v1/endpoint', AuthMiddleware, valueController.getValue);

async function testDatabaseConnection() {
	try {
		await db.raw('SELECT 1');
		console.log('Connected to PostgreSQL successfully.');
	} catch (error) {
		console.error('Failed to connect to PostgreSQL:', error);
		throw error;
	}
}

async function testRedisConnection() {
	try {
		await redis.set('test_key', 'test_value');
		const result = await redis.get('test_key');
		console.log('Successfully set and retrieved key from Redis:', result);
	} catch (error) {
		console.error('Failed to connect to Redis:', error);
		throw error;
	}

	redis.on('connect', () => {
		console.log('Connected to Redis successfully.');
	});

	redis.on('error', (err) => {
		console.error('Redis connection error:', err);
	});
}

async function startServer() {
	try {
		await testDatabaseConnection();
		await testRedisConnection();

		app.listen(Number(port), () => {
			console.log(`Server is running on http://0.0.0.0:${port}`);
		});
	} catch (error) {
		console.error('Error during startup:', error);
	}
}

startServer();
