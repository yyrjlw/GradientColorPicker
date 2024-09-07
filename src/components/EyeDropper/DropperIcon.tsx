import { computed, defineComponent, inject } from 'vue'
import { pickerContextProvide } from '../provide'

export default defineComponent({
  props: {
    color: String
  },
  setup(props) {
    const { defaultStyles } = inject(pickerContextProvide)!

    const col = computed(() => props.color || '')

    return () => (
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style="width: 16px">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{
            fill: 'none',
            strokeWidth: '1.4px',
            ...defaultStyles.value.rbgcpControlIcon,
            ...(col.value && { stroke: col.value })
          }}
          d="M15.6,7h0L7.78,14.86c-.37.37-1.61.38-2,.75s-.5,1.53-.76,2a3.53,3.53,0,0,1-.52.52,1.6,1.6,0,0,1-2.27-.06l-.32-.32a1.61,1.61,0,0,1-.06-2.27A3.25,3.25,0,0,1,2.4,15c.47-.26,1.65-.35,2-.73s.34-1.64.71-2c1.68-1.73,5.61-5.65,7.91-7.93h0l1.14,1.38L15.6,7Z"
        />
        <polygon
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{
            strokeWidth: '1.4px',
            ...defaultStyles.value.rbgcpControlIcon2,
            ...(col.value && { stroke: col.value, fill: col.value })
          }}
          points="15.7 8.87 11.13 4.29 12.69 2.73 17.25 7.31 15.7 8.87"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{
            strokeWidth: '1.4px',
            ...defaultStyles.value.rbgcpControlIcon2,
            ...(col.value && { stroke: col.value, fill: col.value })
          }}
          d="M18.18,3.71,16.36,5.53a1.33,1.33,0,0,1-1.88,0h0a1.34,1.34,0,0,1,0-1.89l1.81-1.82a1.34,1.34,0,0,1,1.89,0h0A1.34,1.34,0,0,1,18.18,3.71Z"
        />
      </svg>
    )
  }
})
