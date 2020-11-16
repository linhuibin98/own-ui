/*
 * @author: linhuibin
 * @date: 2020-11-16 10:45:52
 * @lastEditTime: 2020-11-16 11:25:37
 * @lastEditors: linhuibin
 * @description: 
 * @filePath: \server-RCg:\projects\own-ui\src\shims-vue.d.ts
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
