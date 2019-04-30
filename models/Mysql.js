
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
  }

  /**
   * @name select
   * select from db
   * @param {String} sqlquery the SQL request
   */
   query(sqlquery, cb, fields=null) {
     this._db.query(sqlquery, cb, fields);
   }

  getResultsOf (sql) {
    this._db.query(
      sql,
      (error, res) => {
        if( error ) throw error;
        console.log("getResultsOf", res);
        return res;
      }
    )
  }

}

module.exports = Mysql;
