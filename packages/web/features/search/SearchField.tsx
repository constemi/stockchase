import { FormControl, InputGroupProps } from '@chakra-ui/react'
import React from 'react'
import Search from './Search'

type OptionType = { [key: string]: any }
type OptionsType = Array<OptionType>

type GroupType = {
  [key: string]: any // group label
  options: OptionsType | undefined
}
type ValueType = OptionType | OptionsType | null | void

interface SearchFieldProps {
  options: readonly (OptionType | GroupType)[] | undefined
  loading?: boolean
  handleResult: (result: ValueType) => void
}

export const SearchField = (props: InputGroupProps & SearchFieldProps) => {
  const { handleResult, options, loading } = props

  return (
    <FormControl>
      <Search
        isLoading={loading}
        placeholder="Search for a symbol..."
        options={options}
        onChange={handleResult}
      />
    </FormControl>
  )
}
