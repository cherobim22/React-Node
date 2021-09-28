
exports.up = function(knex) {
  return knex.schema.createTable('produtos', function(table){
    table.string('id').primary();
    table.string('nome').notNullable();
    table.string('GTIN').notNullable();
    table.string('altura').notNullable();
    table.string('largura').notNullable();
    table.string('profundidade').notNullable();
    table.string('peso_bruto').notNullable();
    table.string('peso_liquido').notNullable();
    table.enu('grupo', ["Perfil", "Modulo", "Inversor", "Cabos", "Conectores e Baterias"]).notNullable();
    table.enu('segmento', ["Ongrid", "Offgrid"]).notNullable();
    table.boolean('status').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.timestamp('deleted_at');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');
};
