express-dual
============

> Split your express logic into separate data-fetching/view-rendering functions

# Installation

```sh
npm install --save express-dual
```

# Use

```js
...
const dual = require('express-dual')
const app = express()
app.get('/', dual()
	.data(function (req) {
		return { my: 'data' }
	})
	.view(function (req, res, data, next) {
		res.render('index', data)
	}))
```

# API

## dual() : DualMiddleware

> Create dual middleware

## DualMiddleware.data(dataCallback) : DualMiddleware

> Attach a data-fetching function to middleware

The `dataCallback` function may return data immediately, or return a promise.  The signature of `dataCallback` is `function (request) => Object|Promise`

## DualMiddleware.view(viewCallback) : DualMiddleware

> Attach a view-rendering function to middleware

The signature of `viewCallback` is `function (request, response, data, next)`
