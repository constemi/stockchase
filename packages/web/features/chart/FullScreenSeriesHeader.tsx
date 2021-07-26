import * as React from 'react'
import { Box, ButtonGroup, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

export function FullScreenSeriesHeader() {
  const router = useRouter()
  return (
    <Box h="10" display="flex" justifyContent="space-between" borderTop="1px solid gray">
      <ButtonGroup flexWrap="wrap" spacing={1} pl="1" pt="1">
        <IconButton
          size="sm"
          fontSize="lg"
          aria-label="previous page"
          variant="solid"
          color="current"
          mr="5"
          onClick={() => router.push('/')}
          icon={<ArrowBackIcon />}
        />
      </ButtonGroup>
    </Box>
  )
}
