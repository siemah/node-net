/**
 * @package \
 * @name Router
 * custom router for nodejs app 
 */
class Router {

  /**
   * 
   * @param {http.IncomingMessage} req request incoming insctance
   * @param {http.IncomingResponse} res res incoming instance
   */
  constructor(server) {
    this._server = server;
  }  


  get(path, cb) {

    let { _req, _res } = this;
    if (typeof path === 'function' ) {
      path(_req, _res);
    }
    if( _req.method === 'GET') {
      if( _req.url === path ) cb(_req, _res);
    }
    return this;
  }

  post(path, cb) {
    let { _req, _res } = this;
    if (_req.url === path) return cb(_req, _res);
    throw new Error('The path dosn\'nt exist yet')
  }

  delete(path, cb) {
    let { _req, _res } = this;
    if (_req.url === path) return cb(_req, _res);
    throw new Error('The path dosn\'nt exist yet')
  }

  put(path, cb) {
    let { _req, _res } = this;
    if (_req.url === path) return cb(_req, _res);
    throw new Error('The path dosn\'nt exist yet')
  }



}

module.exports = Router;