import { scaleLog } from 'd3-scale'
import * as React from 'react'
import useWebSocket from 'react-use-websocket'
import { Box, Container, Button, ButtonGroup, useColorModeValue as mode } from '@chakra-ui/react'
import { Page } from './page/Page'
import { Section } from './dashboard/Section'
// import { ColorToggle } from 'layouts/shared/ColorToggle'
import { SimpleAreaSeries } from 'features/chart/BasicBaselineSeries'
import { MeFragment } from 'lib/graphql'
import { DATA_STREAM_URL } from 'lib/config'

type MeType = MeFragment | null | undefined
interface DashBoardProps {
  me: MeType
}

interface ButtonPanelProps {
  isActive: string
  logarithmic: boolean
  setActiveButton: (label: string) => void
  setLogScale: (scale: boolean) => void
}

function ButtonPanel(props: ButtonPanelProps) {
  const labels = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All']

  const { logarithmic, setLogScale, isActive, setActiveButton } = props
  return (
    <Box h="10" display="flex" justifyContent="space-between" borderTop="1px solid gray">
      <ButtonGroup spacing={1} pl="1" pt="1">
        {labels.map((label, idx) => (
          <Button
            key={`resolution-${idx}`}
            variant="outline"
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

export const Dashboard = (props: DashBoardProps) => {
  const [isActive, setActiveButton] = React.useState('1Y')
  const [logarithmic, setLogScale] = React.useState(false)
  const [socketUrl] = React.useState(DATA_STREAM_URL)
  const { /*sendMessage,*/ lastMessage } = useWebSocket(socketUrl, { retryOnError: true })

  const messageHistory = React.useRef([])
  messageHistory.current = React.useMemo(() => messageHistory.current.concat(lastMessage as any), [
    lastMessage,
  ])

  // const handleClickSendMessage = React.useCallback(() => sendMessage('Hello'), [sendMessage])
  // const { me } = props;

  return (
    <Page heading="Overview">
      <Section />
      <Box as="main" flex="1">
        <Container maxW="7xl" py="10">
          <Box bgGradient={mode('none', 'linear(to-t, #393d4f1c, gray.900)')} shadow="md" rounded="md">
            <SimpleAreaSeries
              yScale={logarithmic && scaleLog()}
              tickLabelFill={mode('inherit', 'currentColor')}
            />
            <ButtonPanel
              isActive={isActive}
              logarithmic={logarithmic}
              setLogScale={setLogScale}
              setActiveButton={setActiveButton}
            />
          </Box>
        </Container>
      </Box>
    </Page>
  )
}
