import { FormControl, InputGroupProps } from '@chakra-ui/react'
import { gql } from '@apollo/client'
import React, { useState, useEffect, useCallback } from 'react'
import Search from './Search'
import { useSearchQuery } from 'lib/graphql'
import { useDebounce } from 'lib/hooks/useDebounce'

export const SEARCH = gql`
  query Search($data: SearchSecurityInput!) {
    search(data: $data) {
      symbolId
      displaySymbol
      figi
      type
      currency
      description
    }
  }
`
interface Option {
  value?: string
  label?: string
  selected?: boolean
}

type OptionsType = Array<Option> | null | undefined

interface GroupedOptions {
  label: string
  options: OptionsType | null
}

const formatLabel = (r: any) => {
  return `${r?.displaySymbol} - ${r?.description} (${r?.currency}) ${r?.type} ${formatCountry(r?.currency)}`
}

const formatCountry = (currency: string | undefined): string => {
  if (currency === 'CAD') return '🇨🇦'
  if (currency === 'USD') return '🇺🇸'
  return ''
}

export const SearchField = (props: InputGroupProps) => {
  const [symbol, setSymbol] = useState('')
  const [groupedOptions, setOptions] = useState<GroupedOptions[]>()
  const debouncedSearchTerm = useDebounce(symbol, 300)
  const { loading, /* error,*/ data } = useSearchQuery({
    variables: { data: { symbol: debouncedSearchTerm } },
  })

  const onSearch = (searchTerm: string) => {
    if (searchTerm.length > 0) setSymbol(searchTerm)
  }

  const memoizedGetOptions = useCallback(() => {
    if (!data) return
    if (data.search.length > 0) {
      return data.search.map((r) => ({ value: r?.displaySymbol, label: formatLabel(r) }))
    }
  }, [data])

  useEffect(() => {
    const options = memoizedGetOptions()
    setOptions([{ label: 'search results', options }])
  }, [memoizedGetOptions])

  // const { onChange } = props

  return (
    <FormControl>
      <Search
        isMulti
        name="assetSearch"
        isLoading={loading}
        options={groupedOptions}
        placeholder="Ticker..."
        closeMenuOnSelect={false}
        onInputChange={onSearch}
      />
    </FormControl>
  )
}
