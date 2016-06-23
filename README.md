# api-express
[![npm version](https://badge.fury.io/js/api-express.svg)](https://badge.fury.io/js/api-express)

Handy libraries to build RESTful API controllers in express.js from ES6 generator callbacks.

### Features
- ES6 syntax(generator, class, etc).
- RESTful API

### How to use

To config:
```js
const express = require('express');
const app = express();

const API = require('api-express');

// optional, use pre-defined res.ok and res.fail functions
app.use(API.hook({
    apiOk: true,
    apiFail: true
}));
// res.ok(obj) will output structure like { isSuccess: true, result: obj }
// res.fail(obj) will output structure like { isSuccess: false, errorCode: ..., errorMessage: ..., errorData: ... }

// or self-defined
app.use(API.hook({
    apiOk: function(obj){ ... },
    apiFail: function(obj){ ... }
}));
```

Quickly build basic CRUD controllers:
```js
const UserModel = require('path/to/UserModel');
const api = API.create(UserModel, {
    apiNames: {
        'list': 'someMethod'
    }
});

// providing UserModel.someMethod as an ES6 generator
app.get('/users', api.list);

```

Build your own controller:
```js
const someController = API.builder(function*(){ ... });
app.get('/some/path', someController);
```

### APIs

##### API.create(Model, params)
> Create CRUD methods from an object model
> params.apiNames default:
```
{
    createOne: 'createOne',
    getOne: 'getOne',
    updateOne: 'updateOne',
    removeOne: 'removeOne',
    list: 'list',
    getCount: 'getCount'
}
```

##### API.builder(callback)
> Internal used controller builder

##### API.hook(params)
> Apply with `app.use()` to extend express's `res` object
> params.apiOk: _Boolean|Function_ Set true to use pre-defined callback
> params.apiFail: _Boolean|Function_ Set true to use pre-defined callback

### ToDos
- Improve doc
- Add example
- Error handling feature
