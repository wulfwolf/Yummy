import type { ReactNode } from 'react'
import type { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native'

export type TouchableProps = TouchableOpacityProps & {
  children: ReactNode
  handleSubmit?: () => void
  style?: StyleProp<ViewStyle>
  underlayColor?: string
}
