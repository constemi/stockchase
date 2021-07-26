/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import {
  Box,
  BoxProps,
  Center,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  useColorModeValue,
  useUpdateEffect,
} from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'
import { AnimatePresence, motion, useElementScroll } from 'framer-motion'
import { useRouteChanged } from 'lib/hooks/useRouteChanged'
import { Logo } from 'layouts/shared/Logo'
import { SidebarContent } from '../sidebar/Sidebar'

const routes = [
  {
    title: 'Installation',
    path: '/docs/getting-started',
  },
  {
    title: 'Upgrade to v1',
    path: '/docs/migration',
  },
  {
    title: 'Design Principles',
    path: '/docs/principles',
  },
  {
    title: 'Comparison',
    path: '/docs/comparison',
  },
  {
    title: 'Changelog',
    path: '/changelog',
  },
]

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  const { pathname } = useRouter()

  const [, group] = href.split('/')
  const isActive = pathname.includes(group)

  return (
    <NextLink href={href}>
      <Center
        flex="1"
        minH="40px"
        as="button"
        rounded="md"
        transition="0.2s all"
        fontWeight={isActive ? 'semibold' : 'medium'}
        bg={isActive ? 'teal.400' : undefined}
        borderWidth={isActive ? undefined : '1px'}
        color={isActive ? 'white' : undefined}
        _hover={{
          bg: isActive ? 'teal.500' : useColorModeValue('gray.100', 'whiteAlpha.100'),
        }}
      >
        {children}
      </Center>
    </NextLink>
  )
}

interface MobileNavContentProps {
  isOpen?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { isOpen, onClose = () => {} } = props
  const closeBtnRef = React.createRef<HTMLButtonElement>()
  const { pathname } = useRouter()

  useRouteChanged(onClose)

  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  React.useEffect(() => {
    if (showOnBreakpoint === false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  const [shadow, setShadow] = React.useState<string>()

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction="column"
              w="100%"
              bg={useColorModeValue('white', 'gray.800')}
              h="100vh"
              overflow="auto"
              pos="absolute"
              top="0"
              left="0"
              zIndex={20}
              pb="8"
            >
              <Box>
                <Flex justify="space-between" px="6" pt="5" pb="4">
                  <Logo sx={{ rect: { fill: 'teal.300' } }} />
                  <HStack spacing="5">
                    <CloseButton ref={closeBtnRef} onClick={onClose} />
                  </HStack>
                </Flex>
                <Box px="6" pb="6" pt="2" shadow={shadow}>
                  <HStack>
                    <NavLink href="/docs/getting-started">Docs</NavLink>
                    <NavLink href="/guides/integrations/with-cra">Guides</NavLink>
                    <NavLink href="/team">Team</NavLink>
                  </HStack>
                </Box>
              </Box>

              <ScrollView
                onScroll={(scrolled: any) => {
                  setShadow(scrolled ? 'md' : undefined)
                }}
              >
                <SidebarContent pathname={pathname} routes={routes} />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props
  const [y, setY] = React.useState(0)
  const elRef = React.useRef<any>()
  const { scrollY } = useElementScroll(elRef)
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  useUpdateEffect(() => {
    onScroll?.(y > 5 ? true : false)
  }, [y])

  return <Box ref={elRef} flex="1" id="routes" overflow="auto" px="6" pb="6" {...rest} />
}

export const MobileNavButton = React.forwardRef((props: IconButtonProps, ref: React.Ref<any>) => {
  return (
    <IconButton
      ref={ref}
      display={{ base: 'flex', md: 'none' }}
      fontSize="20px"
      color={useColorModeValue('gray.800', 'inherit')}
      variant="ghost"
      icon={<AiOutlineMenu />}
      {...props}
    />
  )
})
