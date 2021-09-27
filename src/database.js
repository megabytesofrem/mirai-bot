import sql from 'better-sqlite3';

export class Database {
  //
  // Internal database class for Mirai
  // This is very low level, treat it as a black box and don't touch it.
  //
  // Copyright (c) 2020 Charlotte
  //

  // ill do what i want bitch

  async setup() {
    this.conn = sql('mirai.sqlite3');

    // Guild specific options for the bot
    console.log('Creating table "options" if it doesn\'t exist..');
    let statement = this.conn.prepare('CREATE TABLE IF NOT EXISTS options (guildId TEXT PRIMARY KEY, prefix TEXT)');

    // Filters
    console.log('Creating table "filters_cuss" if it doesn\'t exist..')
    let filterStatement = this.conn.prepare('CREATE TABLE IF NOT EXISTS filters_cuss (guildId TEXT PRIMARY KEY, enabled BOOL NOT NULL)');

    await statement.run();
    await filterStatement.run();
  }

  // Prefix
  async setPrefix(guildId, prefix) {
    let rowExists = this.conn.prepare('SELECT * FROM options WHERE guildId = ?').get(guildId);
    let statement = this.conn.prepare(`${rowExists ? 'REPLACE' : 'INSERT'} INTO options (guildId, prefix) VALUES(?, ?)`);

    await statement.run(guildId, prefix);
  }

  getPrefixSync(guildId) {
    try {
      let statement = this.conn.prepare('SELECT * FROM options WHERE guildId = ?').get(guildId)
      return statement.prefix;
    } catch (err) {
      return '';
    }
  }

  async getPrefix(guildId) {
    await this.getPrefixSync(guildId);
  }

  // Filters

  // Internal unsafe functions
  _setGenericFilterState(table, guildId, state) {
    // yes this is unsafe but we never call it externally, so it should be fine
    // famous last words

    let rowExists = this.conn.prepare(`SELECT * FROM ${table} WHERE guildId = ?`).get(guildId);
    let statement = this.conn.prepare(`${rowExists ? 'REPLACE' : 'INSERT'} INTO filters_cuss (guildId, enabled) VALUES(?, ?)`);

    statement.run(guildId, state);
  }

  _getGenericFilterState(table) {
    try {
      let statement = this.conn.prepare(`SELECT * FROM ${table} WHERE guildId = ?`).get(guildId)
      return statement.enabled;
    } catch (err) {
      return '';
    }
  }

  getFilterStateSync(filter) {
    if (filter === 'cuss') {
      return this._getGenericFilterState('filters_cuss');
    }
  }

  // Cuss filter
  async setCussFilter(guildId, state) {
    await this._setGenericFilterState('filters_cuss', guildId, state == true ? 'true' : 'false');
  }

  async getFilterState(filter) {
    await this.getFilterStateSync(filter);
  }
}