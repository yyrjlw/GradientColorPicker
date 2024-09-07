import tinycolor from 'tinycolor2'
import { watchEffect, type ComputedRef } from 'vue'

const usePaintHue = (canvas: HTMLCanvasElement, squareWidth: ComputedRef<number>) => {
  watchEffect(() => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, squareWidth.value, 14)

      const gradient = ctx.createLinearGradient(0, 0, squareWidth.value, 0)
      for (let i = 0; i <= 360; i += 30) {
        gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  })
}

export default usePaintHue

export const usePaintSat = (canvas: HTMLCanvasElement, h: ComputedRef<number>, l: ComputedRef<number>, squareWidth: ComputedRef<number>) => {
  watchEffect(() => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, squareWidth.value, 14)

      const gradient = ctx.createLinearGradient(0, 0, squareWidth.value, 0)
      for (let i = 0; i <= 100; i += 10) {
        gradient.addColorStop(i / 100, `hsl(${h.value}, ${i}%, ${l.value}%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  })
}

export const usePaintLight = (canvas: HTMLCanvasElement, h: ComputedRef<number>, s: ComputedRef<number>, squareWidth: ComputedRef<number>) => {
  watchEffect(() => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, squareWidth.value, 14)

      const gradient = ctx.createLinearGradient(0, 0, squareWidth.value, 0)
      for (let i = 0; i <= 100; i += 10) {
        gradient.addColorStop(i / 100, `hsl(${h.value}, ${s.value}%, ${i}%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  })
}

export const usePaintBright = (canvas: HTMLCanvasElement, h: ComputedRef<number>, s: ComputedRef<number>, squareWidth: ComputedRef<number>) => {
  watchEffect(() => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (ctx) {
      ctx.rect(0, 0, squareWidth.value, 14)

      const gradient = ctx.createLinearGradient(0, 0, squareWidth.value, 0)
      for (let i = 0; i <= 100; i += 10) {
        const hsl = tinycolor({ h: h.value, s: s.value, v: i })
        gradient.addColorStop(i / 100, hsl.toHslString())
      }
      ctx.fillStyle = gradient
      ctx.fill()
    }
  })
}
