import * as React from 'react'
import { useMe } from 'components/providers/MeProvider'
import { Dashboard } from 'layouts/dashboard/Dashboard'
import { Home } from 'layouts/home/Footer/Home'

export default function Index() {
  const me = useMe()
  if (me) {
    return <Dashboard me={me} />
  }
  return <Home />
}
