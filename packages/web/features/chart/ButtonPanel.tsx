import * as React from 'react'
import { Box, Button, ButtonGroup } from '@chakra-ui/react'

interface ButtonPanelProps {
  isActive: string
  logarithmic: boolean
  setActiveButton: (label: string) => void
  setLogScale: (scale: boolean) => void
}

export function ButtonPanel(props: ButtonPanelProps) {
  const labels = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All']

  const { logarithmic, setLogScale, isActive, setActiveButton } = props
  return (
    <Box h="10" display="flex" justifyContent="space-between" borderTop="1px solid gray">
      <ButtonGroup spacing={1} pl="1" pt="1">
        {labels.map((label, idx) => (
          <Button
            key={`resolution-${idx}`}
            variant="solid"
            size="sm"
            cursor="default"
            isActive={isActive === label}
            onClick={() => setActiveButton(label)}
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
