import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  chakra,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useEventListener,
  useUpdateEffect,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { gql } from '@apollo/client'
import { useSearchQuery, SearchSecurityResponse } from 'lib/graphql'
import { useDebounce } from 'lib/hooks/useDebounce'
import { useRouter } from 'next/router'
import * as React from 'react'
import MultiRef from 'react-multi-ref'
import scrollIntoView from 'scroll-into-view-if-needed'
import { findAll } from 'highlight-words-core'
import { SearchButton } from './SearchButton'
import { formatCountry } from 'features/chart/utils'

export const SEARCH = gql`
  query Search($data: SearchSecurityInput!) {
    search(data: $data) {
      symbolId
      displaySymbol
      figi
      type
      currency
      description
    }
  }
`

function OptionText(props: any): any {
  const { searchWords, textToHighlight } = props

  const chunks = findAll({
    searchWords,
    textToHighlight,
    autoEscape: true,
  })

  const highlightedText = chunks.map((chunk) => {
    const { end, highlight, start } = chunk
    const text = textToHighlight.substr(start, end - start)
    if (highlight) {
      return (
        <Box as="mark" bg="transparent" color="teal.500">
          {text}
        </Box>
      )
    } else {
      return text
    }
  })

  return highlightedText
}

function EnterIcon(props: HTMLChakraProps<'svg'>) {
  return (
    <chakra.svg strokeWidth="2px" width="16px" height="16px" viewBox="0 0 20 20" {...props}>
      <g stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 3v4c0 2-2 4-4 4H2" />
        <path d="M8 17l-6-6 6-6" />
      </g>
    </chakra.svg>
  )
}

interface SearchFieldProps {
  handleSearchResult: (result: SearchSecurityResponse) => void
}

function OmniSearch(props: SearchFieldProps) {
  const router = useRouter()
  const [symbol, setSymbol] = React.useState('')
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const debouncedSearchTerm = useDebounce(query, 300)
  const { /*loading, error,*/ data } = useSearchQuery({
    variables: { data: { symbol: debouncedSearchTerm } },
  })
  const menu = useDisclosure()
  const modal = useDisclosure()
  const [menuNodes] = React.useState(() => new MultiRef<number, HTMLElement>())
  const menuRef = React.useRef<HTMLDivElement>(null)
  const eventRef = React.useRef<'mouse' | 'keyboard' | null>(null)

  const { handleSearchResult } = props

  React.useEffect(() => {
    router.events.on('routeChangeComplete', modal.onClose)
    return () => {
      router.events.off('routeChangeComplete', modal.onClose)
    }
  }, [modal.onClose, router])

  useEventListener('keydown', (event) => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.platform)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    if (event?.key?.toLowerCase() === 'k' && event[hotkey]) {
      event.preventDefault()
      modal.isOpen ? modal.onClose() : modal.onOpen()
    }
  })

  const results = React.useMemo(
    function getResults() {
      if (query.length < 2) return []
      return data?.search || []
    },
    [query, data],
  )

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = 'keyboard'
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          if (active + 1 < results.length) {
            setActive(active + 1)
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          if (active - 1 >= 0) {
            setActive(active - 1)
          }
          break
        }
        case 'Enter': {
          modal.onClose()
          const result = results?.[active]
          if (result) {
            if (handleSearchResult) {
              handleSearchResult(result)
            }
            setSymbol(result.displaySymbol)
          }
          break
        }
      }
    },
    [active, results, modal, handleSearchResult],
  )

  useUpdateEffect(() => {
    setActive(0)
  }, [query])

  useUpdateEffect(() => {
    if (!menuRef.current || eventRef.current === 'mouse') return
    const node = menuNodes.map.get(active)
    if (!node) return
    scrollIntoView(node, {
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest',
      boundary: menuRef.current,
    })
  }, [active])

  const open = menu.isOpen && results.length > 0

  return (
    <>
      <SearchButton symbol={symbol} onClick={modal.onOpen} />
      <Modal scrollBehavior="inside" isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent
          role="combobox"
          aria-expanded="true"
          aria-haspopup="listbox"
          rounded="lg"
          overflow="hidden"
          top="4vh"
          bg="transparent"
          shadow="lg"
          maxW="600px"
        >
          <Flex pos="relative" align="stretch">
            <chakra.input
              aria-autocomplete="list"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              maxLength={64}
              sx={{
                w: '100%',
                h: '68px',
                pl: '68px',
                fontWeight: 'medium',
                outline: 0,
                bg: 'white',
                '.chakra-ui-dark &': { bg: 'gray.700' },
              }}
              placeholder="Search for a security (US)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                menu.onOpen()
              }}
              onKeyDown={onKeyDown}
            />
            <Center pos="absolute" left={7} h="68px">
              <SearchIcon color="teal.500" boxSize="20px" />
            </Center>
          </Flex>
          <ModalBody maxH="66vh" p="0" ref={menuRef}>
            {open && (
              <Box
                sx={{
                  px: 4,
                  bg: 'white',
                  '.chakra-ui-dark &': { bg: 'gray.700' },
                }}
              >
                <Box as="ul" role="listbox" borderTopWidth="1px" pt={2} pb={4}>
                  {results.map((item, index) => (
                    <Box
                      key={`${item.figi}`}
                      id={`search-item-${item.figi}`}
                      as="li"
                      aria-selected={index === active ? true : undefined}
                      cursor="pointer"
                      onMouseEnter={() => {
                        setActive(index)
                        eventRef.current = 'mouse'
                      }}
                      onClick={() => {
                        modal.onClose()
                        if (handleSearchResult) {
                          handleSearchResult(item)
                        }
                        setSymbol(item.displaySymbol)
                      }}
                      ref={menuNodes.ref(index)}
                      role="option"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minH: 16,
                        mt: 2,
                        px: 4,
                        py: 2,
                        rounded: 'lg',
                        bg: 'gray.100',
                        '.chakra-ui-dark &': { bg: 'gray.600' },
                        _selected: {
                          bg: 'teal.500',
                          color: 'white',
                          mark: {
                            color: 'white',
                            textDecoration: 'underline',
                          },
                        },
                      }}
                    >
                      {formatCountry(item.currency)}

                      <Box flex="1" ml="4">
                        <Box fontWeight="medium" fontSize="xs" opacity={0.7}>
                          {item.displaySymbol}
                        </Box>

                        <Box fontWeight="semibold">
                          <OptionText searchWords={[query]} textToHighlight={item.description} />
                        </Box>
                      </Box>

                      <EnterIcon opacity={0.5} />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OmniSearch
