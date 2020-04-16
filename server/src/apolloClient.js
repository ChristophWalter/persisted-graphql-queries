const { InMemoryCache } = require("apollo-cache-inmemory")
const { ApolloClient } = require("apollo-client")
const { createHttpLink } = require("apollo-link-http")
const fetch = require("cross-fetch")

const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com/",
  fetch,
})
module.exports = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
