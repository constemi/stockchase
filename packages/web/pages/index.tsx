import * as React from 'react'
import { useMe } from 'lib/hooks/useMe'
import { Dashboard } from 'layouts/dash/Dashboard'
import { Home } from 'layouts/home/Home'

export default function Index() {
  const { me, loading } = useMe()
  if (me) {
    return <Dashboard me={me} />
  }
  return <Home />
}
