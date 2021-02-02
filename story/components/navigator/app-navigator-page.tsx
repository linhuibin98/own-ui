import {defineComponent, reactive, DefineComponent, markRaw, watch } from 'vue'
import {injectAppNavigator} from './app-navigator'
import NotFoundPage from 'story/pages/page_404.vue'

export const AppNavigatorPage = defineComponent({
  name: 'app-navigator-page',
  setup() {
    const state = reactive({
      PageComponent: null as null | DefineComponent // 根据路由匹配的页面组件
    })
    const navigator = injectAppNavigator()

    const utils = {
      reset: async () => {
        let {path} = navigator.state.route
        if (!path) {
          return
        }
        if (path.charAt(0) === '/') {
          path = path.slice(1)
        }
        try {
          const Component = (await import(`story/pages/${path}`)).default
          state.PageComponent = markRaw(Component)
        } catch (e) {
          console.log(`路由${path}不存在`)
          state.PageComponent = null
        }
      }
    }

    /*
    监听 hash 路由变化, 重新匹配组件
    * */
    watch(() => navigator.state.route.path, utils.reset, {immediate: true})

    return () => {
      const {PageComponent} = state
      console.log('PageComponent', PageComponent)
      return (
          <div class="app-navigator-page">
            {!!PageComponent ? <PageComponent /> : <NotFoundPage />}
          </div>
      )
    }

  }
})