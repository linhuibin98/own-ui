<!--
 * @author: linhuibin
 * @date: 2020-11-16 10:45:52
 * @lastEditTime: 2020-11-16 14:47:07
 * @lastEditors: linhuibin
 * @description: APP vue
 * @FilePath: \server-RCg:\projects\own-ui\story\App.vue
-->
<template>
  <AppNavigator default-path="normal/button">
    <article class="app-home">
      <section class="app-header" :style="{ height: HomeConfig.headSize + 'px' }"></section>
      <section class="app-menu" :style="{ top: HomeConfig.headSize + 'px', width: HomeConfig.menuSize + 'px' }"></section>
      <section class="app-content" :style="{ paddingLeft: HomeConfig.menuSize + 'px', paddingTop: HomeConfig.headSize + 'px' }">
        <AppNavigatorPage />
      </section>
    </article>
  </AppNavigator>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppNavigator } from './components/navigator/app-navigator'
import { AppNavigatorPage } from './components/navigator/app-navigator-page'

const HomeConfig = {
  headSize: 60,
  menuSize: 240,
}

export default defineComponent({
  name: 'App',
  components: {
    AppNavigator,
    AppNavigatorPage
  },
  setup() {
    return {
      HomeConfig
    }
  }
})
</script>

<style lang="scss">
@import './assets/styles/index.scss';
html, body {
  background-color: #F7F8FA;
}
.app-home {
  .app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: solid 1px #f2f2f2;
    background-color: white;
  }
  .app-menu {
    position: fixed;
    left: 0;
    bottom: 0;
    border-right: solid 1px #f2f2f2;
    background-color: white;
  }
  .app-content {
    background-color: #F7F8FA;
  }
}
</style>
