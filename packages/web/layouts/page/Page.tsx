import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  useBoolean,
  useBreakpointValue,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import NextLink from 'next/link'

import { HiDuplicate, HiMail, HiOutlineMenu, HiRefresh, HiTemplate, HiViewGrid, HiX } from 'react-icons/hi'
import { Logo } from 'layouts/shared/Logo'
import { NavItem } from './NavItem'
import { Notification } from './Notification'
import { ProfileDropdown } from './ProfileDropdown'
import { TabLink } from './TabLink'
import { SearchField } from 'features/search/SearchField'

interface PageProps {
  heading: string
  children: React.ReactNode
}
const useMobileMenuState = () => {
  const [isMenuOpen, actions] = useBoolean()
  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const isMobileBreakpoint = useBreakpointValue({ base: true, lg: false })

  React.useEffect(() => {
    if (isMobileBreakpoint === false) {
      actions.off()
    }
  }, [isMobileBreakpoint, actions])

  return { isMenuOpen, ...actions }
}

export const Page = (props: PageProps) => {
  const { isMenuOpen, toggle } = useMobileMenuState()
  const { heading, children } = props
  return (
    <Flex direction="column" bg={mode('white', 'gray.900')}>
      <Flex align="center" bg="blue.600" color="white" px="6" h="16">
        <Flex justify="space-between" align="center" w="full">
          {/* Mobile Hamburger Menu */}
          <Box ms="-4" minW={{ base: '12', lg: '76px' }} display={{ lg: 'none' }}>
            <Box as="button" onClick={toggle} p="2" fontSize="xl">
              <Box aria-hidden as={isMenuOpen ? HiX : HiOutlineMenu} />
              <Box srOnly>{isMenuOpen ? 'Close menu' : 'Open menu'}</Box>
            </Box>
          </Box>

          {/* Mobile Navigation Menu  */}
          <Flex
            hidden={!isMenuOpen}
            as="nav"
            direction="column"
            bg="blue.600"
            position="fixed"
            height="calc(100vh - 4rem)"
            top="16"
            insetX="0"
            zIndex={10}
            w="full"
          >
            <Box px="4">
              <NavItem.Mobile active label="Dashboard" />
              <NavItem.Mobile label="Campaigns" />
              <NavItem.Mobile label="Forms" />
              <NavItem.Mobile label="Sites" />
              <NavItem.Mobile label="Automation" />
            </Box>
          </Flex>

          {/* Desktop Logo placement */}
          <NextLink href="/" passHref>
            <Box as="a" rel="home">
              <Logo display={{ base: 'none', lg: 'flex' }} flexShrink={0} marginEnd="10" />
            </Box>
          </NextLink>

          {/* Centered Search Field */}
          <Box justify="center" align="center" flexShrink={0} minW={{ base: '300px', lg: '500px' }}>
            <SearchField />
          </Box>

          <HStack spacing="3">
            <Notification display={{ base: 'none', lg: 'inline-flex' }} />
            <ProfileDropdown />
          </HStack>
        </Flex>
      </Flex>

      {/* Page Header */}
      <Box bg={mode('white', 'gray.900')} pt="8" shadow="sm">
        <Container maxW="7xl">
          {/* Desktop Navigation Menu */}
          <HStack display={{ base: 'none', lg: 'flex' }} flex="1" spacing={{ base: '0', lg: '3' }} pb="8">
            <NavItem.Desktop active icon={<HiViewGrid />} label="Dashboard" />
            <NavItem.Desktop icon={<HiMail />} label="Campaigns" />
            <NavItem.Desktop icon={<HiDuplicate />} label="Forms" />
            <NavItem.Desktop icon={<HiTemplate />} label="Sites" />
            <NavItem.Desktop icon={<HiRefresh />} label="Automation" />
          </HStack>
          <Heading size="lg" mb="3">
            {heading}
          </Heading>
          <Stack direction="row" spacing="4">
            <TabLink aria-current="page" href="#">
              Overview
            </TabLink>
            <TabLink href="#">Analytics</TabLink>
            <TabLink href="#">Automation</TabLink>
          </Stack>
        </Container>
      </Box>

      {children}
    </Flex>
  )
}
