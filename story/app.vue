<!--
 * @author: linhuibin
 * @date: 2020-11-16 10:45:52
 * @lastEditTime: 2020-11-16 14:47:07
 * @lastEditors: linhuibin
 * @description: APP vue
 * @FilePath: \server-RCg:\projects\own-ui\story\App.vue
-->
<template>
  <app-text ref="appText"></app-text>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import AppText from './components/app-test'

export default defineComponent({
  name: 'App',
  components: {
    AppText
  },
  setup() {
    const appText = ref(null)

    onMounted(() => {
      console.log('appText', appText.value)
    })
    return {
      appText
    }
  }
})
</script>

<style lang="scss">
@import './assets/styles/index.scss';
</style>
