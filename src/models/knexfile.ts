import { env } from '../config/env.config';

const knexConfig = {
	client: 'pg',
	connection: {
		host: env.dbHost,
		user: env.dbUser,
		password: env.dbPassword,
		database: env.dbName,
	},
	migrations: {
		directory: './src/models/migrations',
	},
	pool: { min: 0, max: 7 },
};

export default knexConfig;
