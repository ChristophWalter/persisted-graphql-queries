import Vue from "vue"
import App from "./App.vue"
import VueApollo from "vue-apollo"
import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink } from "apollo-link"

const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com/",
})
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount("#app")
