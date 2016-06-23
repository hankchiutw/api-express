'use strict'

const cn = require('co-nextware');

/**
 * Build an api controller from an ES6 generator callback
 */
module.exports = function(callback){
    return cn(function *(req, res, next){
        const params = Object.assign({}, req.body, req.query, req.params);

        console.info(`[INFO] (api-express) ${__filename}: params:`, params);

        let ret = yield callback(params);

        // if Model has handy formatter
        if(!Array.isArray(ret) && ret.toJSON) ret = ret.toJSON();

        if(res.ok) res.ok(ret);
        else res.send(ret);
    });
};
