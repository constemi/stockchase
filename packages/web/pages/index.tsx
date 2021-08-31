import * as React from 'react'
import { useMe } from 'components/providers/MeProvider'
import { Dashboard } from 'layouts/dash/Dashboard'
import { Home } from 'layouts/home/Home'

export default function Index() {
  const me = useMe()
  if (me) {
    return <Dashboard me={me} />
  }
  return <Home />
}
