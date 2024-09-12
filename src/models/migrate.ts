import knex from 'knex';
import config from './knexfile';

const db = knex(config);

db.migrate
	.latest()
	.then(() => {
		console.log('Migrations are up to date!');
		process.exit(0);
	})
	.catch((err: any) => {
		console.error('Migration failed:', err);
		process.exit(1);
	});
