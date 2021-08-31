import NextLink from 'next/link'
import React from 'react'
import {
  chakra,
  Flex,
  Box,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useUpdateEffect,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { useViewportScroll } from 'framer-motion'
import { SearchSecurityResponse } from 'lib/graphql'
import { Logo } from 'layouts/shared/Logo'
import { DonateButton } from './Donate'
import { Notification } from '../Notification'
import { ProfileDropdown } from './ProfileDropdown'
import { FaMoon, FaSun } from 'react-icons/fa'
import { MobileNavButton, MobileNavContent } from './MobileNav'
import Search from 'features/search/SearchModal'

interface HeaderProps {
  handleSearchResult: (result: SearchSecurityResponse) => void
}

function HeaderContent(props: HeaderProps) {
  const mobileNav = useDisclosure()

  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const mobileNavBtnRef = React.useRef<HTMLButtonElement | null | undefined>()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  const { handleSearchResult } = props

  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <NextLink href="/" passHref>
            <chakra.a display="block" aria-label="StockChase UI, Back to homepage">
              <Logo iconColor="blue.300" display={{ base: 'none', md: 'block' }} />
              <Box minW="3rem" display={{ base: 'block', md: 'none' }}>
                <Logo iconOnly iconColor="blue.300" />
              </Box>
            </chakra.a>
          </NextLink>
        </Flex>

        <Flex justify="flex-end" w="100%" align="center" color="gray.400" maxW="1100px">
          <Search handleSearchResult={handleSearchResult} />
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml={{ base: '0', md: '3' }}
            onClick={toggleMode}
            icon={<SwitchIcon />}
          />
          <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
            <Notification display={{ base: 'none', lg: 'inline-flex' }} />
            <ProfileDropdown />
            <DonateButton />
          </HStack>

          <MobileNavButton ref={mobileNavBtnRef} aria-label="Open Menu" onClick={mobileNav.onOpen} />
        </Flex>
      </Flex>
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </>
  )
}

export function Header(props: HTMLChakraProps<'header'> & HeaderProps) {
  const bg = useColorModeValue('white', 'gray.900')
  const ref = React.createRef<HTMLHeadingElement>()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useViewportScroll()
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  const { handleSearchResult, ...rest } = props
  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
      {...rest}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="8xl">
        <HeaderContent handleSearchResult={handleSearchResult} />
      </chakra.div>
    </chakra.header>
  )
}
