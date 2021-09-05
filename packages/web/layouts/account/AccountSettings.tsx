import {
  HStack,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Stack,
  StackDivider,
  StackProps,
} from '@chakra-ui/react'
import * as React from 'react'
import format from 'date-fns/format'
import { Card } from '../shared/Card'
import { FieldGroup } from './FieldGroup'
import { HeadingGroup } from '../shared/HeadingGroup'
import { useMe } from 'lib/hooks/useMe'

export const AccountSettings = (props: StackProps) => {
  const { me, loading } = useMe()
  const fullName = `${me?.firstName} ${me?.lastName}`

  return (
    <Stack as="section" spacing="6" {...props}>
      <HeadingGroup title="Account Settings" description="Change your profile, request your data, and more" />
      <Card>
        <Stack divider={<StackDivider />} spacing="6">
          <FieldGroup title="Name &amp; Avatar" description="Change your name and profile picture">
            <HStack spacing="4">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                name={fullName}
              />
              <Box>
                <Text>{fullName}</Text>
                <Text color="gray.500" fontSize="sm">
                  {format(new Date(), 'MMMM, yyyy')}
                </Text>
              </Box>
            </HStack>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                Change name
              </Button>
              <Button size="sm" fontWeight="normal">
                Change gravatar
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup title="Login details" description="Change your email and password">
            <Text fontSize="sm">{me?.email}</Text>
            <HStack mt="5">
              <Button size="sm" fontWeight="normal">
                Change email
              </Button>
              <Button size="sm" fontWeight="normal">
                Change password
              </Button>
            </HStack>
          </FieldGroup>

          <FieldGroup title="Language" description="Change your preferred language and currency">
            <Stack direction={{ base: 'column', md: 'row' }} width="full" spacing="4">
              <FormControl id="language">
                <FormLabel fontSize="sm">Language</FormLabel>
                <Select size="sm" maxW="2xs">
                  <option>English</option>
                  <option>French</option>
                  <option>Arabic</option>
                </Select>
              </FormControl>

              <FormControl id="currency">
                <FormLabel fontSize="sm">Currency</FormLabel>
                <Select size="sm" maxW="2xs">
                  <option>CAD ($)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </Select>
              </FormControl>
            </Stack>
            <Button mt="5" size="sm" fontWeight="normal">
              Save Changes
            </Button>
          </FieldGroup>

          <FieldGroup title="Communications" description="Manage your email preference">
            <Stack spacing="3">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-marketing" flex="1" fontSize="sm" mb="0">
                  Product intro, tips, and inspiration
                </FormLabel>
                <Switch id="email-marketing" />
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
                  Updates about company news and features
                </FormLabel>
                <Switch id="email-news" />
              </FormControl>
            </Stack>
            <Button mt="5" size="sm" fontWeight="normal">
              Save Changes
            </Button>
          </FieldGroup>
        </Stack>
      </Card>
    </Stack>
  )
}
