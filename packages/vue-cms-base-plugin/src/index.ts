import { defineAsyncComponent } from "vue";
import type { Component, App } from "vue";
import * as components from "@shopware/components";

export type CmsBasePluginOptions = {
  components: Record<string, Component>;
};

export default {
  install(app: App, config: CmsBasePluginOptions) {
    Object.entries(components as CmsBasePluginOptions["components"]).forEach(
      ([name, component]) => {
        if (name in config.components) {
          const asyncComponent = defineAsyncComponent({
            loader: () =>
              new Promise<Component>((resolve) => {
                resolve(config.components[name]);
              }),
          });
          app.component(name, asyncComponent);
        } else {
          app.component(name, component);
        }
      }
    );
  },
};
