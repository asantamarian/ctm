'use strict'
const data = use('App/Utils/Data')
const { Command } = require('@adonisjs/ace')

class Scaffold extends Command {
  static get signature () {
    return 'scaffold'
  }

  static get description () {
    return 'Crea estructura de mantenedor para esuquema'
  }

  async handle (args, options) {
    const table = await this
    .ask('Nombre de la Tabla')
    

    const context = this;
    var query = `select * from 
    INFORMATION_SCHEMA.COLUMNS as c
    inner join INFORMATION_SCHEMA.KEY_COLUMN_USAGE as k on c.TABLE_NAME = k.TABLE_NAME
    where c.TABLE_NAME='${table}'`;

    const result   = await data.execQuery(query);

    var schema = result[0];

    console.log(schema)

    context.info('Dummy implementation for scaffold command')
  }
}

module.exports = Scaffold
