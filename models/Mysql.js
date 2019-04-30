const { promisify } = require('util');
/**
 * @package App
 * this is a mysql tools to query a Mysql/mariadb DB
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
        console.log(i < fields.length - 1);
        if (i < whereFields.length-1 ) sql += ', '
      })
      sql = this._db.format(sql, [whereFields]);
      sql = this._db.format(sql, [whereValues]);
    }
    return this.query(
      sql
    )
  }
  
  

}

module.exports = Mysql;
