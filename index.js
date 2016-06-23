'use strict'

/**
 * Class API
 */
function API(Model, params){
    const self = this;
    params = params || {};

    this.apiNames = {
        createOne: 'createOne',
        getOne: 'getOne',
        updateOne: 'updateOne',
        removeOne: 'removeOne',
        list: 'list',
        getCount: 'getCount'
    };

    // override with user specified apiNames
    Object.keys(this.apiNames).forEach(function(apiName){
        if(!params.apiName) return;
        if(params.apiNames[apiName]) this.apiNames[apiName] = params.apiNames[apiName];
    });

    // construct api methods to the instance
    Object.keys(this.apiNames).forEach(function(apiName){
        if(!Model[apiName]) return;
        self[apiName] = self.constructor.builder(Model[apiName].bind(Model));
    });
}

API.create = function(Model, params){
    return new API(Model, params);
};

API.hook = require('./lib/hook');
API.builder = require('./lib/builder');

module.exports = API;
