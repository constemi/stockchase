import {
  Box,
  Flex,
  Heading,
  Img,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { BsArrowRight, BsClockFill } from 'react-icons/bs'

interface BlogProps {
  category: string
  title: string
  href: string
  media: string
  description: string
  author: {
    name: string
    href: string
  }
}

const Blog = (props: BlogProps) => {
  const { title, href, description, media, author, category } = props
  return (
    <LinkBox
      as="article"
      bg={{ sm: mode('white', 'gray.700') }}
      shadow={{ sm: 'base' }}
      rounded={{ sm: 'md' }}
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ shadow: { sm: 'lg' } }}
    >
      <Flex direction="column">
        <Img height="60" objectFit="cover" alt={title} src={media} />
        <Flex direction="column" px={{ sm: '6' }} py="5">
          <Text
            casing="uppercase"
            letterSpacing="wider"
            fontSize="xs"
            fontWeight="semibold"
            mb="2"
            color="gray.500"
          >
            {category}
          </Text>
          <Heading as="h3" size="sm" mb="2" lineHeight="base">
            <LinkOverlay href={href}>{title}</LinkOverlay>
          </Heading>
          <Text noOfLines={2} mb="8" color={mode('gray.600', 'gray.400')}>
            {description}
          </Text>
          <Flex align="baseline" justify="space-between" fontSize="sm" color={mode('gray.600', 'gray.400')}>
            <Text>
              By{' '}
              <Box as="a" textDecor="underline" href={author.href}>
                {author.name}
              </Box>
            </Text>
            <Link href="#">
              <Box as={BsClockFill} display="inline-block" me="2" opacity={0.4} />3 min read
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export const Research = () => {
  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} py={{ base: '10', sm: '24' }}>
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Heading size="xl" mb="8" fontWeight="extrabold">
          Featured Articles
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="12" mb="10">
          <Blog
            category="Spending"
            media="https://images.unsplash.com/photo-1586034679970-cb7b5fc4928a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            title="7 Steps to Get Financial Results At Home"
            description="How to right size your savings to make compounding work for you"
            href="#"
            author={{ name: 'Constemi', href: '#' }}
          />
          <Blog
            category="Deep Market"
            media="https://images.unsplash.com/photo-1608817576203-3c27ed168bd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            title="What is happening in the world of Eurodollars"
            description="A look at the eurodollar futures curve and what it is saying about growth"
            href="#"
            author={{ name: 'Constemi', href: '#' }}
          />
          <Blog
            category="Derivatives"
            media="https://images.unsplash.com/photo-1502920514313-52581002a659?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            title="OTC derivatives"
            description="Who is making bets on the outcome of China's tranformation"
            href="#"
            author={{ name: 'Constemi', href: '#' }}
          />
        </SimpleGrid>
        <Link fontSize="xl" fontWeight="bold" color={mode('blue.600', 'blue.400')}>
          <span>View all articles</span>
          <Box as={BsArrowRight} display="inline-block" ms="2" />
        </Link>
      </Box>
    </Box>
  )
}
