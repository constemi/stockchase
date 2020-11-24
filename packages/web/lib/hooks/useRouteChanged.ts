import * as React from "react"
import Router from "next/router"

export const useRouteChanged = (callback: (url: string) => void, deps: any[] = []) => {
  React.useEffect(() => {
    Router.events.on("routeChangeComplete", callback)
    return () => {
      Router.events.off("routeChangeComplete", callback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
