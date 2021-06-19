/* eslint-disable react-hooks/rules-of-hooks */
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { SidebarLink } from './SidebarLink'
import {
  Box,
  Center,
  Flex,
  List,
  ListItem,
  ListProps,
  useColorModeValue,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { BlogIcon, DocsIcon, GuidesIcon, TeamIcon, ResourcesIcon } from './SidebarIcons'

interface NavLinkProps {
  href: string
  icon: HTMLChakraProps<'svg'>
  children: React.ReactNode
}

export interface SidebarContentProps {
  pathname?: string
  contentRef?: any
  routes?: Array<{ title: string; path: string }>
}

export function SidebarContent(props: SidebarContentProps) {
  const { routes } = props
  return (
    <>
      {routes?.map((route: { title: string; path: string }, index: number) => {
        return (
          <SidebarLink ml="-3" mt="2" key={route.path} href={route.path}>
            {route.title}
          </SidebarLink>
        )
      })}
    </>
  )
}

const MainNavLink = ({ href, icon, children }: NavLinkProps) => {
  const { pathname } = useRouter()
  const [, group] = href.split('/')
  const active = pathname.includes(group)
  const linkColor = useColorModeValue('gray.900', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? linkColor : 'gray.500'}
        _hover={{ color: linkColor }}
      >
        <Center w="6" h="6" bg="teal.400" rounded="base" mr="3">
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  )
}

const mainNavLinks = [
  {
    icon: <DocsIcon />,
    href: '/docs/getting-started',
    label: 'Docs',
  },
  {
    icon: <GuidesIcon />,
    href: '/guides/integrations/with-cra',
    label: 'Guides',
  },
  {
    icon: <ResourcesIcon />,
    href: '/resources',
    label: 'Resources',
  },
  {
    icon: <TeamIcon />,
    href: '/team',
    label: 'Team',
  },
  {
    icon: <BlogIcon />,
    href: '/blog',
    label: 'Blog',
  },
]

const MainNavLinkGroup = (props: ListProps) => {
  return (
    <List spacing="4" styleType="none" {...props}>
      {mainNavLinks.map((item) => (
        <ListItem key={item.label}>
          <MainNavLink icon={item.icon} href={item.href}>
            {item.label}
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  )
}

const Sidebar = ({ routes }: any) => {
  const { pathname } = useRouter()
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: 'contain',
      }}
      top="6.5rem"
      w="280px"
      h="calc(100vh - 8.125rem)"
      pr="8"
      pb="6"
      pl="6"
      pt="4"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <MainNavLinkGroup mb="10" />
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  )
}

export default Sidebar
