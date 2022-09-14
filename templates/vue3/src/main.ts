import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueCmsPlugin from "@shopware/vue-cms-base-plugin";
import * as components from "./components";

const app = createApp(App);

// console.warn("components", components);
app.use(VueCmsPlugin, { components });
app.mount("#app");
