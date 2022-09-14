# The problem

External library has components that are depended from internal ones like:

```html
<!-- no import in <script> section -->
<CmsImage>
  <img :src="props.src" />
  <CmsElementText :content="props.content" />
</CmsImage>
```

Sometimes, there is a need to replace only the internal component (`CmsElementText`), without touching the main component. Another scenario is when we want to change the main component, but using internally the base internal component:

```html
<!-- no import in <script> section -->

<!-- inverse just the order -->
<CmsImage>
  <CmsElementText :content="props.content" />
  <img :src="props.src" />
</CmsImage>
```

## Solution

One of the possibilities is to leave the component resolving to the project context. It means, there is no need to import any component, even internal (child), leave it in the `<template>` under its name. The advantage of the solution is that the compiled library (esm lib) contains a `resolveComponent` method from the Vue runtime library.
The method accepts only the component name:

```js
// example of compiled js code for a SFC Vue component
import { resolveComponent, openBlock, createElementBlock, createVNode, createElementVNode } from "vue";

function _sfc_render$1(_ctx, _cache) {
  const _component_CmsText = resolveComponent("CmsText"); // runtime resolving
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    _hoisted_2$1,
    createVNode(_component_CmsText),
    _hoisted_3$1
  ]);
}
```

Having the `resolveComponent` instead of other ways of using explicitly imported components, or auto importing libraries does the trick here. Now you can register every component in your application. No matter if it's child or parent.

## The Vue3 plugin as a glue

There is a basic Vue3 plugin in `./packages/vue-cms-base-plugin/src/index.ts` file.

The flow of the approach is:

1. Get (import) the components from a Cms (Base) component library, named `@shopware/components`
2. Iterate over the collection of components available (exported)
3. If specific component name exists also in locally provided CMS Components - use it instead of Base one.
4. Register the Base one otherwise.

```ts
import type { App } from "vue";
import * as cmsBaseLibraryComponents from "@shopware/components";


export type CmsBasePluginOptions = {
  localProjectComponents: Record<string, Component>;
};

export default {
  install(app: App, config: CmsBasePluginOptions) {
  // TL;DR solution
  // register local one instead of base one if exists
  app.component(name, config.localProjectComponents[name] || cmsBaseLibraryComponents[name])
```

`config.localProjectComponents` are the components passed as an argument of config during registering the Vue3 plugin.

`cmsBaseLibraryComponents` is the CMS-Base components, exported as ES module, contained named exports of each available component.

## The implementation in Vue 3 project

There is a Vue3 application containing the plugin, run on Vite (see `./templates/vue3`).

```ts
// src/main.ts of Vue3 app

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueCmsPlugin from "@shopware/vue-cms-base-plugin"; // a plugin to glue the base components and the new ones
import * as components from "./components"; // import local components to pass them into the plugin

const app = createApp(App);

app.use(VueCmsPlugin, { components }); // local components are passed to use them instead the base ones in case of name collision.
app.mount("#app");
```

## Check this out

Override a specific component using only one file: `templates/vue3/src/components/index.ts`
