import { Box, Divider, Stack, StackDivider, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { subDays, format, formatDistanceToNow, fromUnixTime } from 'date-fns'
import { FaRegNewspaper } from 'react-icons/fa'
import { Description } from './Description'
import { getNews, NewsType } from 'lib/express/fetch.news'

interface NewsFeedProps {
  symbol: string
}

export function NewsFeed(props: NewsFeedProps) {
  const [newsFeed, setNewsFeed] = React.useState<NewsType[]>()
  const { symbol } = props

  React.useEffect(() => {
    const intervalEnd = new Date()
    const intervalStart = subDays(intervalEnd, 7)

    async function fetchNewsFeed() {
      const data = await getNews(
        symbol,
        format(intervalStart, 'yyyy-MM-dd'),
        format(intervalEnd, 'yyyy-MM-dd'),
      )
      setNewsFeed(data)
    }
    fetchNewsFeed()
  }, [symbol])

  return (
    <Box as="section" bg={mode('gray.100', 'inherit')} py="12">
      <Box mx="auto" px={{ md: '8' }}>
        <Box
          rounded={{ lg: 'lg' }}
          bg={mode('white', 'gray.900')}
          maxW="8xl"
          mx="auto"
          shadow="base"
          overflow="hidden"
        >
          <Box px="6" py="4">
            <Text as="h3" fontWeight="bold" fontSize="lg">
              {symbol} News
            </Text>
            <Text color={mode('gray.600', 'gray.300')} fontSize="sm">
              Various Sources
            </Text>
          </Box>
          <Divider />
          <Stack spacing="6" divider={<StackDivider />} py="5" px="8">
            <Box>
              {newsFeed?.map((item) => (
                <Box key={item.id} py="4">
                  <Text pb="1" fontSize="xs">
                    {formatDistanceToNow(fromUnixTime(item.datetime))} ago
                  </Text>

                  <Description
                    isRecommended={item.source.includes('SeekingAlpha')}
                    title={item.headline}
                    icon={<FaRegNewspaper />}
                    uri={item.url}
                  >
                    {item.summary}
                  </Description>
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
