import { watch, type ComputedRef, type Ref } from 'vue'

const usePaintSquare = (canvas: Ref<HTMLCanvasElement | undefined>, hue: () => number, squareWidth: ComputedRef<number>, squareHeight: ComputedRef<number>) => {
  watch([canvas, hue, squareWidth, squareHeight], () => {
    if (canvas.value) {
      const ctx = canvas.value.getContext('2d', { willReadFrequently: true })
      if (ctx) {
        ctx.fillStyle = `hsl(${hue()}, 100%, 50%)`
        ctx.fillRect(0, 0, squareWidth.value, squareHeight.value)
        const gradientWhite = ctx.createLinearGradient(0, 0, squareWidth.value, 0)
        gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`)
        gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`)
        ctx.fillStyle = gradientWhite
        ctx.fillRect(0, 0, squareWidth.value, squareHeight.value)
        const gradientBlack = ctx.createLinearGradient(0, 0, 0, squareHeight.value)
        gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`)
        gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`)
        ctx.fillStyle = gradientBlack
        ctx.fillRect(0, 0, squareWidth.value, squareHeight.value)
      }
    }
  })
}

export default usePaintSquare
