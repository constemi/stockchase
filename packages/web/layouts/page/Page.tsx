import { Box, Container, Flex, Heading, HStack, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { SearchSecurityResponse, MeFragment } from 'lib/graphql'
import { HiDuplicate, HiArrowRight, HiRefresh, HiTemplate, HiViewGrid } from 'react-icons/hi'
import { Header } from './header/Header'
import { NavItem } from './NavItem'
import { TabLink } from './TabLink'

type MeType = MeFragment | null | undefined

interface PageProps {
  me?: MeType
  heading?: string
  children: React.ReactNode
  includeTabNavigation?: boolean
  handleSearchResult: (result: SearchSecurityResponse) => void
}

export const Page = (props: PageProps) => {
  const { heading, children, includeTabNavigation = false, handleSearchResult } = props
  return (
    <Flex direction="column" bg={mode('white', 'gray.900')}>
      {/* App Header */}
      <Header handleSearchResult={handleSearchResult} />
      {/* Page Header */}
      <Box bg={mode('white', 'gray.900')} pt="8" shadow="sm">
        <Container maxW="8xl" hidden={!includeTabNavigation}>
          {/* Desktop Navigation Menu */}
          <HStack display={{ base: 'none', lg: 'flex' }} flex="1" spacing={{ base: '0', lg: '3' }} pb="8">
            <NavItem.Desktop active icon={<HiViewGrid />} label="Charts" />
            <NavItem.Desktop icon={<HiArrowRight />} label="Trade" />
            <NavItem.Desktop icon={<HiDuplicate />} label="Markets" />
            <NavItem.Desktop icon={<HiTemplate />} label="Screeners" />
            <NavItem.Desktop icon={<HiRefresh />} label="More" />
          </HStack>
          <Heading size="lg" mb="3">
            {heading}
          </Heading>
          <Stack direction="row" spacing="4">
            <TabLink aria-current="page" href="#">
              Overview
            </TabLink>
            <TabLink href="#">Ideas</TabLink>
            <TabLink href="#">Financials</TabLink>
            <TabLink href="#">Technicals</TabLink>
          </Stack>
        </Container>
      </Box>

      {children}
    </Flex>
  )
}
