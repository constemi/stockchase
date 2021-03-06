import * as React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { Page } from 'layouts/page/Page'
import { AccountSettings } from 'layouts/account/AccountSettings'
import { DangerZone } from 'layouts/account/DangerZone'
import { ExternalAccountSettings } from 'layouts/account/ExternalAccountSettings'

const Account: React.FC = () => {
  return (
    <Page>
      <Box as="main" px={{ base: '4', md: '10' }} py="16" maxWidth="3xl" mx="auto">
        <Stack spacing="12">
          <AccountSettings />
          <ExternalAccountSettings />
          <DangerZone />
        </Stack>
      </Box>
    </Page>
  )
}

export default Account
