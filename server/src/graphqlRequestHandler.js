const apolloClient = require("./apolloClient")

module.exports = class GraphqlRequestHandler {
  constructor(queries) {
    this.hashToQueryMap = {}
    queries.forEach((query) => {
      this.hashToQueryMap[query.documentId] = query
    })
    return (req, res, next) => {
      this.handle(req, res, next)
    }
  }

  async handle(req, res, next) {
    const query = this.getQueryForHash(req)
    const variables = req.body.variables

    if (query) {
      try {
        console.log("sending graphql query")
        const response = await apolloClient.query({ query, variables })
        console.log("returning graphql response")
        res.send(response)
      } catch (error) {
        console.log("error while sending graphql query")
        next(error)
      }
    } else {
      console.log("no matching query for hash found")
      res.status(400).send()
    }
  }

  getQueryForHash(req) {
    const persistedQueryHash =
      req.body.extensions &&
      req.body.extensions.persistedQuery &&
      req.body.extensions.persistedQuery.sha256Hash
    if (persistedQueryHash) {
      console.log("search query for provided hash " + persistedQueryHash)
      return this.hashToQueryMap[persistedQueryHash]
    } else {
      console.log("no hash provided")
      return undefined
    }
  }
}
