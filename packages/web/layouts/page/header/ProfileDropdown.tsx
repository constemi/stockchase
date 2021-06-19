import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useMenuButton,
  UseMenuButtonProps,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { useMe } from 'components/providers/MeProvider'
import { useLogout } from 'lib/hooks/useLogout'
import { useRouter } from 'next/router'
import { MeFragment } from 'lib/graphql'
import * as React from 'react'

interface MeType {
  me: MeFragment | null | undefined
}

function UserAvatar(props: MeType) {
  const { me } = props

  return (
    <Avatar
      size="sm"
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      name={me?.email}
    />
  )
}

const ProfileMenuButton = (props: UseMenuButtonProps & MeType) => {
  const { me, ...rest } = props
  const buttonProps = useMenuButton(rest)
  return (
    <Flex
      {...buttonProps}
      as="button"
      flexShrink={0}
      rounded="full"
      outline="0"
      _focus={{ shadow: 'outline' }}
    >
      <Box srOnly>Open user menu</Box>
      <UserAvatar me={me} />
    </Flex>
  )
}

export function ProfileDropdown() {
  const me = useMe()
  const router = useRouter()
  const logout = useLogout()

  return (
    <Menu>
      <ProfileMenuButton me={me} />
      <MenuList rounded="md" shadow="lg" py="1" color={mode('gray.600', 'inherit')} fontSize="sm">
        <HStack px="3" py="4">
          <UserAvatar me={me} />
          <Box lineHeight="1">
            <Text fontWeight="semibold">{me?.firstName}</Text>
            <Text mt="1" fontSize="xs" color="gray.500">
              {me?.email}
            </Text>
          </Box>
        </HStack>
        <MenuItem fontWeight="medium">Your Profile</MenuItem>
        <MenuItem fontWeight="medium">Feedback & Support</MenuItem>
        <MenuItem fontWeight="medium" onClick={() => router.push('/account')}>
          Account Settings
        </MenuItem>
        <MenuItem fontWeight="medium" color={mode('red.500', 'red.300')} onClick={() => logout()}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
