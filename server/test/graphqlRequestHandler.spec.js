const GraphqlRequestHandler = require("../src/graphqlRequestHandler")
const express = require("express")
const { InMemoryCache } = require("apollo-cache-inmemory")
const { ApolloClient } = require("apollo-client")
const { ApolloLink } = require("apollo-link")
const { createHttpLink } = require("apollo-link-http")
const { createPersistedQueryLink } = require("apollo-link-persisted-queries")
const fetch = require("cross-fetch")
const nock = require("nock")
const MOCK_QUERY = require("./mockQuery.graphql")
const { print } = require("graphql")

let url
let server

beforeAll(() => {
  const app = express()
  app.use(express.json())
  // We need to pass the mocked queries to the handler as require.context() will not work in jest
  app.post("/graphql", new GraphqlRequestHandler([getMockQuery()]))

  server = app.listen(0)
  url = `http://localhost:${server.address().port}/graphql`
})

afterAll(() => {
  server.close()
})

test("should send correct graphql query by its hash and return the result", async () => {
  const mock = nock("https://countries.trevorblades.com")
    .post("/", (body) => {
      return (
        body.operationName === "getMockContinents" &&
        body.variables.zone === "universe"
      )
    })
    .reply(200, MOCKED_CONTINENTS)

  const response = await sendGraphqlRequest(getMockQuery(), {
    zone: "universe",
  })
  expect(response.data).toEqual(MOCKED_CONTINENTS.data)
  expect(mock.isDone()).toEqual(true)
})

test("should not allow to send graphql queries without allowed hash", async () => {
  const mock = nock("https://countries.trevorblades.com")
    .post("/")
    .reply(200, MOCKED_CONTINENTS)

  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: print(MOCK_QUERY) }),
  })
  expect(response.status).toEqual(400)
  expect(mock.isDone()).toEqual(false)
})

const MOCKED_CONTINENTS = {
  data: {
    continents: [{ name: "Universe", code: "U", __typename: "Continent" }],
  },
}

function getMockQuery() {
  // Adding the hash (documentId) manually is required, as we do not run the tests with webpack
  return {
    ...MOCK_QUERY,
    documentId: "my-dummy-hash",
  }
}

async function sendGraphqlRequest(query, variables) {
  const httpLink = createHttpLink({
    uri: url,
    fetch,
  })
  const automaticPersistedQueryLink = createPersistedQueryLink({
    generateHash: ({ documentId }) => documentId,
  })
  const apolloClient = new ApolloClient({
    link: ApolloLink.from([automaticPersistedQueryLink, httpLink]),
    cache: new InMemoryCache(),
  })
  return await apolloClient.query({
    query,
    variables,
  })
}
