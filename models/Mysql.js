const { promisify } = require('util');
/**
 * @package App
 * this is a mysql tools to query a Mysql/mariadb DB
 * @author siemah 
 * @date 04/28/2019
 * @version 1.0.0
 */
class Mysql {
 
  /**
   * @name constructor
   * constructor of this class
   * @param db {Object} a db connect object instance
   */
  constructor(db) {
    this._db = db;
    this.query = promisify(this._db.query.bind(this._db));
  }
 
  /**
   * @name insert 
   * insert a data into DB
   * @param {String} table name of table to insrt new data
   * @param {Array} fields list of fields of table 
   * @param {Array} values list of values of must be has the same length like fields
   * @return {Promise} new Promise of result
   */
  insert(table, fields, values) {
    let sql = this._db.format(
      'insert into ?? (??) values ( ',
      [table, fields, values]
    ); 
    fields.map((field, i) => {
      sql += '?'
      if(i<fields.length-1) sql+=', '
    })
    sql += ")"; 
    return this.query(
      {
        sql,
        values,
      }
    )
  }

  /**
   * @name select
   * select a bunch of data from DB 
   * @param {Array} fields list of fields to retreive
   * @param {String} table name of table
   * @param {Array} whereFields list of fields use on where condition closure
   * @param {Array} whereValues list of values of whereFields
   * @return {Promise} the result 
   */
  select(fields, table, whereFields = [], whereValues = []) {
    let sql = this._db.format(
      'SELECT ?? FROM ??',
      [fields, table]
    );
    if (whereFields.length && whereValues.length ) {
      sql += ' WHERE '
      whereFields.map((field, i) => {
        sql += `??=?`;
        if (i < whereFields.length-1 ) sql += ', '
      })
      sql = this._db.format(sql, [whereFields]);
      sql = this._db.format(sql, [whereValues]);
    }
    return this.query(
      sql
    )
  }
  
  /**
   * @name update
   * update the data on DB
   * @param {String} table the name of tabme to update
   * @param {Arrau} fields list of field to update
   * @param {Array} values list of values of field to be updated
   * @param {Array} whereFields list of field used if not empty on WHERE closure(sql consition)
   * @param {Array} whereValues values of WHERE field closure
   * @return {Promise} new Promise of result (promisify query method of mysql package) @see https://www.npmjs.com/package/mysql
   */
  update(table, fields, values, whereFields=[], whereValues=[]) {
    let sql = this._db.format(`UPDATE ?? SET `, [table]);
    const ESCAPEVALUE = ':field';
    const regexp = new RegExp(ESCAPEVALUE, 'g');
    fields.map((field, i) => {
      sql += `??=${ESCAPEVALUE}`
      if( i<fields.length-1) sql += ', ';
    });
    sql = this._db.format(sql, fields);
    sql = sql.replace(regexp, '?');
    sql = this._db.format(sql, values);
    if (whereFields.length && whereValues.length) {
      sql += ' WHERE '
      whereFields.map((field, i) => {
        sql += `??=?`;
        if (i < whereFields.length - 1) sql += ', '
      })
      sql = this._db.format(sql, [whereFields]);
      sql = this._db.format(sql, [whereValues]);
    }
    return this.query(sql);
  }
  

}

module.exports = Mysql;
