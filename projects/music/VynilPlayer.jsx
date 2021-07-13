import * as React from 'react'
import { VynilPlayerContainer } from './styled'

export const VynilPlayer = ({ children, className = "" }) => {
  return <VynilPlayerContainer className={className}>
    <svg viewBox="0 0 981 905" overflow="visible">
      {children}
    </svg>
  </VynilPlayerContainer>
}