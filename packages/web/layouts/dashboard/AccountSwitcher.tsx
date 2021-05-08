import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Img,
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useColorModeValue,
  useMenuButton,
} from '@chakra-ui/react'
import { useLogout } from 'lib/hooks/useLogout'
import * as React from 'react'
import { HiSelector } from 'react-icons/hi'

const AccountSwitcherButton = (props: FlexProps) => {
  const buttonProps = useMenuButton(props)
  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gray.700"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: 'gray.600' }}
      _focus={{ shadow: 'outline' }}
    >
      <HStack flex="1" spacing="3">
        <Img
          w="8"
          h="8"
          rounded="md"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fG1hbiUyMHNpbWxpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=100"
          alt="Chakra UI"
        />
        <Box textAlign="start">
          <Box isTruncated fontWeight="semibold">
            Chakra UI
          </Box>
          <Box fontSize="xs" color="gray.400">
            ID 123343
          </Box>
        </Box>
      </HStack>
      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
    </Flex>
  )
}

export const AccountSwitcher = () => {
  const logout = useLogout()
  return (
    <Menu>
      <AccountSwitcherButton />
      <MenuList shadow="lg" py="4" color={useColorModeValue('gray.600', 'gray.200')} px="3">
        <Text fontWeight="medium" mb="2">
          email@chakra-ui.com
        </Text>
        <MenuOptionGroup defaultValue="chakra-ui">
          <MenuItemOption value="chakra-ui" fontWeight="semibold" rounded="md">
            Chakra UI
          </MenuItemOption>
          <MenuItemOption value="careerlyft" fontWeight="semibold" rounded="md">
            CareerLyft
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuItem rounded="md">Workspace settings</MenuItem>
        <MenuItem rounded="md">Add an account</MenuItem>
        <MenuDivider />
        <MenuItem rounded="md" onClick={() => logout()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
