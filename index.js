'use strict'

module.exports = function makeMiddleware() {
	var viewCallback = null
	var dataCallback = null

	var middleware = function (req, res, next) {
		function onError(error) {
			res.status(500).end(error.message)
		}

		try {
			Promise.resolve(dataCallback(req))
			.then(function (data) {
				if (req.headers.accept == 'application/json')
					res.json(data)
				else
					viewCallback(req, res, data, next)
			})
			.catch(onError)
		} catch (error) {
			onError(error)
		}
	}

	//
	// chainable functions:
	//
	middleware.data = function (fn) {
		dataCallback = fn
		return middleware
	}
	middleware.view = function (fn) {
		viewCallback = fn
		return middleware
	}
}
