import { Heading, Flex, HTMLChakraProps, useToken } from '@chakra-ui/react'
import { RiStockLine } from 'react-icons/ri'

import * as React from 'react'

export const Logo = (props: HTMLChakraProps<'div'> & { iconColor?: string; iconOnly?: boolean }) => {
  const { iconColor = 'currentColor', iconOnly = false, ...rest } = props
  const color = useToken('colors', iconColor)
  return (
    <Flex direction="row" {...rest}>
      <RiStockLine size="20px" title="StockChase" color={color} />
      {!iconOnly && (
        <Heading size="md" ml="1" mt="1" color="curentColor">
          StockChase
        </Heading>
      )}
    </Flex>
  )
}
