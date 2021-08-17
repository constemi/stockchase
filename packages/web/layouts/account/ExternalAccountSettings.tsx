import { Stack, StackProps } from '@chakra-ui/react'
import { FaMoneyBill, FaChartLine, FaChartArea, FaChartPie } from 'react-icons/fa'
import * as React from 'react'
import { Card } from '../shared/Card'
import { HeadingGroup } from '../shared/HeadingGroup'
import { ExternalAccount } from './ExternalAccount'

export const ExternalAccountSettings = (props: StackProps) => (
  <Stack as="section" spacing="6" {...props}>
    <HeadingGroup title="Connected accounts" description="Connect your account to one or more provides" />
    <Card>
      <Stack spacing="5">
        <ExternalAccount
          provider="Questrade"
          icon={FaChartLine}
          iconColor="green.500"
          username="dabestcoder03"
        />
        <ExternalAccount provider="Interactive Brokers" icon={FaChartArea} iconColor="red.500" />
        <ExternalAccount provider="Wealthica" icon={FaMoneyBill} iconColor="blue.500" />
        <ExternalAccount provider="Passiv" icon={FaChartPie} username="lisabeats09" />
      </Stack>
    </Card>
  </Stack>
)
