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
   * @param {String} sql SQL query 
   * @param {Array} values list of values default []
   * @param {String} table name of table to insrt new data
   * @param {Function}
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
  
  

}

module.exports = Mysql;
