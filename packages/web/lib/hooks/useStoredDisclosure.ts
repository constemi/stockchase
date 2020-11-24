import * as React from "react"
import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react"

export function useStoredDisclosure(key: string, args?: UseDisclosureProps) {
  const sidebarProps = useDisclosure({
    defaultIsOpen: localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) || "false")
      : args?.defaultIsOpen,
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(sidebarProps.isOpen))
  }, [key, sidebarProps.isOpen])
  return sidebarProps
}
