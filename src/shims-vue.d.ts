declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '@kangc/v-md-editor' {
  const md: any;
  export = md;
}
declare module '@kangc/v-md-editor/lib/theme/vuepress.js' {
  const md: any;
  export = md;
}
