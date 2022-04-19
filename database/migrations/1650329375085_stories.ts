import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stories extends BaseSchema {
  protected tableName = 'stories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').nullable()
      table.string('link').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
