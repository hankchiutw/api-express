'use strict'

const ERROR_CODE_ENUM = {
    400: 'Bad request. Check body parameter and query parameters.',
    401: 'Unauthorized(Authorization header not found or wrong)',
    403: 'Not permitted',
    404: 'Object not found'
};


/**
 * Middleware to extend res object
 * @params {Object} params
 * @params {Boolean|Function} params.apiOk
 * @params {Boolean|Function} params.apiFail
 * @params {String} params.logLevel
 */
module.exports = function(params){
    params = params || {};

    return function(req, res, next){
        if(params.apiOk === true) res.ok = _ok;
        if(typeof params.apiOk === 'function') res.ok = params.apiOk;

        if(params.apiFail === true) res.fail = _fail;
        if(typeof params.apiFail === 'function') res.ok = params.apiFail;

        next();
    };
};

/**
 * Private implementation
 */

function _ok(obj){
    const ret = {
        isSuccess: true,
        result: obj
    };
    console.info(`(api-express) _ok:`, ret);

    this.send(ret);
}

/**
 *
 * @example
 * {
 *  result: {
 *      isSuccess: false,
 *      errorCode: 450,
 *      errorMessage: '', // for client
 *      errorData: '' // for program
 *  }
 * }
 */
function _fail(obj, code){
    const errorMessage = ERROR_CODE_ENUM[code] ? ERROR_CODE_ENUM[code] : (typeof obj !== 'string' ? JSON.stringify(obj) : obj);
    const ret = {
        isSuccess: false,
        errorCode: code || 450,
        errorMessage,
        errorData: obj 
    };
    console.error(`(api-express) _fail:`, ret);

    this.json(ret);
}
