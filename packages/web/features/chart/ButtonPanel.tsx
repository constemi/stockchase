import * as React from 'react'
import { Box, Button, ButtonGroup, useColorModeValue as mode } from '@chakra-ui/react'
import { Interval } from './utils'

interface ButtonPanelProps {
  isActive: string
  logarithmic: boolean
  setResolution: (label: string) => void
  setLogScale: (scale: boolean) => void
}

export function ButtonPanel(props: ButtonPanelProps) {
  const { logarithmic, setLogScale, isActive, setResolution } = props
  const intervalMap = React.useMemo(() => new Interval(), [])

  return (
    <Box
      h="10"
      display="flex"
      justifyContent="space-between"
      bg={mode('white.100', 'gray.900')}
      borderTop="1px solid gray"
    >
      <ButtonGroup flexWrap="wrap" spacing={1} pl="1" pt="1">
        {Object.keys(intervalMap.labels).map((label, idx) => (
          <Button
            key={`resolution-${idx}`}
            variant="solid"
            size="sm"
            cursor="default"
            isActive={isActive === label}
            onClick={() => setResolution(label)}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
      <Box pr="1" pt="1">
        <Button
          variant="outline"
          size="sm"
          cursor="default"
          isActive={logarithmic}
          onClick={() => setLogScale(!logarithmic)}
        >
          log
        </Button>
      </Box>
    </Box>
  )
}
