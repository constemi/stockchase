import * as React from 'react'
import { useMe } from 'components/providers/MeProvider'
import { Dashboard } from 'layouts/Dashboard'
import { Home } from 'layouts/Home'

export default function Index() {
  const me = useMe()
  return me ? <Dashboard me={me} /> : <Home />
}
