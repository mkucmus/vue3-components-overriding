// Generated by 'unplugin-auto-import'
export {}
declare global {
  const CmsImage: typeof import('./src/index')['CmsImage']
}
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly CmsImage: UnwrapRef<typeof import('./src/index')['CmsImage']>
  }
}
