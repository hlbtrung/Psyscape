import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";


import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
Amplify.configure(outputs);


import App from "./App.vue";
import AppView from "./AppView.vue";
import NotFound from "./NotFound.vue";

const routes = [
  {
    path: "/",
    component: AppView,
    name: "home",
  },
  {
    path:"/*",
    component:NotFound
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});


let app = createApp(App)
app.use(router)
app.mount("#app");


export default router;