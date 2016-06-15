'use strict'

var assert = require('assert')

module.exports = function makeMiddleware(dataCallback, viewCallback) {
	var middleware = function (req, res, next) {
		assert(typeof dataCallback == 'function', 'The data-callback must be a function')
		assert(typeof viewCallback == 'function', 'The view-callback must be a function')

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
			}, onError)
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

	return middleware
}
