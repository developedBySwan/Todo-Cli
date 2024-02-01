/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('tasks', function (table) {
        table.uuid('id').defaultTo(knex.fn.uuid());
        table.string('name');
        table.string('description').nullable();
        table.boolean('is_doned').defaultTo(false);
        table.string('priority_level').defaultTo(1);
        table.timestamp('done_at').nullable();
        table.timestamps();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists('tasks')
};
