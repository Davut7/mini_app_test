import dotenv from 'dotenv';

dotenv.config();

function validateEnv() {
	const requiredEnvVars = [
		'PORT',
		'API_VERSION',
		'REDIS_HOST',
		'REDIS_PORT',
		'DB_HOST',
		'DB_USER',
		'DB_PASSWORD',
		'DB_NAME',
		'JWT_SECRET',
	];

	const missingVars = requiredEnvVars.filter(
		(varName) => !process.env[varName]
	);

	if (missingVars.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missingVars.join(', ')}`
		);
	}
}

validateEnv();

export const env = {
	port: process.env.PORT,
	apiVersion: process.env.API_VERSION,
	redisHost: process.env.REDIS_HOST,
	redisPort: Number(process.env.REDIS_PORT),
	dbHost: process.env.DB_HOST,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	jwtSecret: process.env.JWT_SECRET,
};
