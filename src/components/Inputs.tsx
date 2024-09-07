import { formatInputValues, round } from '../utils/formatters'
import { rgb2cmyk, cmykToRgb } from '../utils/converters'
import tc from 'tinycolor2'
import { computed, defineComponent, inject, ref, watch } from 'vue'
import { pickerContextProvide } from './provide'

const Input = defineComponent({
  props: {
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 100
    },
    label: {
      type: String,
      required: true
    }
  },
  emits: ['callback'],
  setup(props, { emit }) {
    const temp = ref(props.value)
    const { hideOpacity, defaultStyles } = inject(pickerContextProvide)!
    const width = computed(() => (hideOpacity.value ? '22%' : '18%'))

    watch(
      () => props.value,
      (newVal) => {
        temp.value = newVal
      }
    )

    const onChange = (e: any) => {
      const newVal = formatInputValues(parseFloat(e.target.value), 0, props.max)
      temp.value = newVal
      emit('callback', newVal)
    }

    return () => (
      <div style={{ width: width.value }}>
        <input value={temp.value} id="rbgcp-input" onChange={(e) => onChange(e)} style={{ ...defaultStyles.value.rbgcpInput }} />
        <div style={{ ...defaultStyles.value.rbgcpInputLabel }}>{props.label}</div>
      </div>
    )
  }
})

const HexInput = defineComponent({
  props: {
    opacity: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { handleChange, tinyColor, defaultStyles } = inject(pickerContextProvide)!
    const disable = ref('')
    const hex = computed(() => tinyColor.value.toHex())
    const newHex = ref(hex.value)

    watch([tinyColor, disable, hex], () => {
      if (disable.value !== 'hex') {
        newHex.value = hex.value
      }
    })

    const hexFocus = () => {
      disable.value = 'hex'
    }

    const hexBlur = () => {
      disable.value = ''
    }

    const handleHex = (e: any) => {
      const tinyHex = tc(e.target.value)
      newHex.value = e.target.value
      if (tinyHex.isValid()) {
        const { r, g, b } = tinyHex.toRgb()
        const newColor = `rgba(${r}, ${g}, ${b}, ${props.opacity})`
        handleChange(newColor)
      }
    }

    return () => (
      <div style={{ width: '23%' }}>
        <input
          value={newHex.value}
          onBlur={hexBlur}
          onFocus={hexFocus}
          id="rbgcp-hex-input"
          onChange={(e) => handleHex(e)}
          style={{ ...defaultStyles.value.rbgcpInput, ...defaultStyles.value.rbgcpHexInput }}
        />
        <div style={{ ...defaultStyles.value.rbgcpInputLabel }}>HEX</div>
      </div>
    )
  }
})

const RGBInputs = defineComponent({
  setup() {
    const { handleChange, hc } = inject(pickerContextProvide)!

    const handleRgb = ({ r, g, b }: { r: number; g: number; b: number }) => {
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.value?.a})`)
    }

    return () => (
      <>
        <Input value={hc.value?.r} onCallback={(newVal) => handleRgb({ r: newVal, g: hc.value?.g, b: hc.value?.b })} label="R" max={255} />
        <Input value={hc.value?.g} onCallback={(newVal) => handleRgb({ r: hc.value?.r, g: newVal, b: hc.value?.b })} label="G" max={255} />
        <Input value={hc.value?.b} onCallback={(newVal) => handleRgb({ r: hc.value?.r, g: hc.value?.g, b: newVal })} label="B" max={255} />
      </>
    )
  }
})

const HSLInputs = defineComponent({
  setup() {
    const { handleChange, tinyColor, setHc, hc } = inject(pickerContextProvide)!
    const s = computed(() => tinyColor.value.toHsl().s)
    const l = computed(() => tinyColor.value.toHsl().l)

    const handleH = (h: number, s: number, l: number) => {
      const { r, g, b } = tc({ h: h, s: s, l: l }).toRgb()
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.value?.a})`)
      setHc({ ...hc.value, h })
    }

    const handleSl = (value: { h: number; s: number; l: number }) => {
      const { r, g, b } = tc(value).toRgb()
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.value?.a})`)
    }

    return () => (
      <>
        <Input value={round(hc.value?.h)} onCallback={(newVal) => handleH(newVal, s.value, l.value)} label="H" max={360} />
        <Input value={round(s.value * 100)} onCallback={(newVal) => handleSl({ h: hc.value?.h, s: newVal, l: l.value })} label="S" />
        <Input value={round(l.value * 100)} onCallback={(newVal) => handleSl({ h: hc.value?.h, s: s.value, l: newVal })} label="L" />
      </>
    )
  }
})

const HSVInputs = defineComponent({
  setup() {
    const { handleChange, setHc, hc } = inject(pickerContextProvide)!

    const handleH = (h: number, s: number, v: number) => {
      const { r, g, b } = tc({ h: h, s: s, v: v }).toRgb()
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.value?.a})`)
      setHc({ ...hc.value, h })
    }

    const handleSV = (value: any) => {
      const { r, g, b } = tc(value).toRgb()
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.value?.a})`)
    }

    return () => (
      <>
        <Input value={round(hc.value?.h)} onCallback={(newVal) => handleH(newVal, hc.value?.s, hc.value?.v)} label="H" max={360} />
        <Input value={round(hc.value?.s * 100)} onCallback={(newVal) => handleSV({ h: hc.value?.h, s: newVal, v: hc.value?.v })} label="S" />
        <Input value={round(hc.value?.v * 100)} onCallback={(newVal) => handleSV({ h: hc.value?.h, s: hc.value?.s, v: newVal })} label="V" />
      </>
    )
  }
})

const CMKYInputs = defineComponent({
  setup() {
    const { handleChange, hc } = inject(pickerContextProvide)!
    const cmyk = computed(() => rgb2cmyk(hc.value?.r, hc.value?.g, hc.value?.b))
    const c = computed(() => cmyk.value.c)
    const m = computed(() => cmyk.value.m)
    const y = computed(() => cmyk.value.y)
    const k = computed(() => cmyk.value.k)

    const handleCmyk = (value: Parameters<typeof cmykToRgb>[0]) => {
      const { r, g, b } = cmykToRgb(value)
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.value?.a})`)
    }

    return () => (
      <>
        <Input value={round(c.value * 100)} onCallback={(newVal) => handleCmyk({ c: newVal / 100, m: m.value, y: y.value, k: k.value })} label="C" />
        <Input value={round(m.value * 100)} onCallback={(newVal) => handleCmyk({ c: c.value, m: newVal / 100, y: y.value, k: k.value })} label="M" />
        <Input value={round(y.value * 100)} onCallback={(newVal) => handleCmyk({ c: c.value, m: m.value, y: newVal / 100, k: k.value })} label="Y" />
        <Input value={round(k.value * 100)} onCallback={(newVal) => handleCmyk({ c: c.value, m: m.value, y: y.value, k: newVal / 100 })} label="K" />
      </>
    )
  }
})

const Inputs = defineComponent({
  setup() {
    const { handleChange, inputType, hideOpacity, hc, defaultStyles } = inject(pickerContextProvide)!

    return () => (
      <div
        style={{
          paddingTop: 14 + 'px',
          display: 'flex',
          justifyContent: 'space-between',
          ...defaultStyles.value.rbgcpInputsWrap
        }}
        id="rbgcp-inputs-wrap">
        {inputType.value !== 'cmyk' && <HexInput opacity={hc.value?.a} />}
        {inputType.value === 'hsl' && <HSLInputs />}
        {inputType.value === 'rgb' && <RGBInputs />}
        {inputType.value === 'hsv' && <HSVInputs />}
        {inputType.value === 'cmyk' && <CMKYInputs />}

        {!hideOpacity.value && (
          <Input value={Math.round(hc.value?.a * 100)} onCallback={(newVal: number) => handleChange(`rgba(${hc.value?.r}, ${hc.value?.g}, ${hc.value?.b}, ${newVal / 100})`)} label="A" />
        )}
      </div>
    )
  }
})

export default Inputs
