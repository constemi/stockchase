import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  useDisclosure,
  VisuallyHidden,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import NextLink from 'next/link'
import { Logo } from '../../shared/Logo'
import { NavLink } from './shared/NavLink'
import { NavMenu } from './shared/NavMenu'
import { Submenu } from './NavContent/Submenu'
import { ToggleButton } from './NavContent/ToggleButton'
import { links } from './shared/_data'
import type { Link } from './shared/_data'

const MobileNavContext = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <NextLink href="/" passHref>
          <Box as="a" rel="home" mx="auto">
            <Logo h="24px" iconColor="blue.400" />
          </Box>
        </NextLink>
        <Box visibility={{ base: 'hidden', sm: 'visible' }}>
          <NextLink href="/" passHref>
            <Button as="a" colorScheme="blue">
              Get Started
            </Button>
          </NextLink>
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {links.map((link: Link, idx: number) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          ),
        )}
        <Button colorScheme="blue" w="full" size="lg" mt="5">
          Try for free
        </Button>
      </NavMenu>
    </>
  )
}

const DesktopNavContent = (props: FlexProps) => {
  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <NextLink href="/" passHref>
        <Box as="a" rel="home">
          <VisuallyHidden>StockChase</VisuallyHidden>
          <Logo h="6" iconColor="blue.500" />
        </Box>
      </NextLink>
      <HStack as="ul" id="nav__primary-menu" aria-label="Main Menu" listStyleType="none">
        {links.map((link: Link, idx: number) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="240px" justify="space-between">
        <NextLink href="/login" passHref>
          <Box as="a" aria-label="Sign In" color={mode('blue.600', 'blue.300')} fontWeight="bold">
            Sign In
          </Box>
        </NextLink>
        <NextLink href="/register" passHref>
          <Button as="a" aria-label="Sign up" colorScheme="blue" fontWeight="bold">
            Sign up for free
          </Button>
        </NextLink>
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}
