import { createApp } from "vue";
import App from "./App";
import Router from "./router";
import "./assets/less/index.less";

const app = createApp(App);

app.use(Router);
app.mount("#app");
