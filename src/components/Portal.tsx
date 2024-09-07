import { Teleport, type SetupContext } from 'vue'

export default function Portal(_props: unknown, { slots }: SetupContext) {
  return <Teleport to="body">{slots.default?.()}</Teleport>
}
