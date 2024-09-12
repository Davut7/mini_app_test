import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
	return knex.schema.createTable('values', function (table) {
		table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		table
			.uuid('user_id')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
		table.string('value').notNullable();
		table.timestamp('expires_at').notNullable();
		table.timestamps(true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
	return knex.schema.dropTableIfExists('values');
}
