import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'app-test',
  setup() {
    const count = ref(0)
    const add = () => {
      count.value++
    }
    return () => (
      <>
        <div>测试水电费</div>
        <div style={{fontWeight: 'bold', fontSize:'22px'}}>测试水电费</div>
        <div>{ count.value }</div>
        <button onClick={add}>add</button>
      </>
    )
  }
})