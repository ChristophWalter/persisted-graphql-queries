const queries = require.context("../../client/queries", false, /\.graphql$/)

let resolvedQueries = []
queries.keys().forEach((key) => resolvedQueries.push(queries(key)))

module.exports = resolvedQueries
