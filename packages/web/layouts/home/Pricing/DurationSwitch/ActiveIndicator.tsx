import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion'
import * as React from 'react'

const ActiveIndicatorImpl = chakra('div', {
  baseStyle: {
    w: 'full',
    h: 'full',
    borderRadius: 'full',
    pos: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  },
})

export const ActiveIndicator = motion.custom(
  React.forwardRef<HTMLDivElement, HTMLChakraProps<'div'>>(function HTMLDivElement(props, ref) {
    const chakraProps = Object.fromEntries(Object.entries(props).filter(([key]) => !isValidMotionProp(key)))
    return <ActiveIndicatorImpl ref={ref} {...chakraProps} />
  }),
)
