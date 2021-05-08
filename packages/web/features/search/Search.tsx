/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import Select, { components as selectComponents } from 'react-select'
import {
  Flex,
  Tag,
  Center,
  TagCloseButton,
  TagLabel,
  Divider,
  CloseButton,
  Box,
  Portal,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const chakraStyles = {
  input: (provided: React.CSSProperties) => ({
    ...provided,
    color: 'inherit',
    lineHeight: 1,
  }),
  menu: (provided: React.CSSProperties) => ({
    ...provided,
    boxShadow: 'none',
  }),
  valueContainer: (provided: React.CSSProperties) => ({
    ...provided,
    padding: '0.125rem 1rem',
  }),
  control: () => {},
  menuList: () => {},
  option: () => {},
  multiValue: () => {},
  multiValueLabel: () => {},
  multiValueRemove: () => {},
  group: () => {},
}

const chakraComponents = {
  // Control components
  Control: ({ children, innerRef, innerProps, isDisabled, isFocused }: any) => {
    const inputStyles = useMultiStyleConfig('Input', {})
    return (
      <StylesProvider value={inputStyles}>
        <Flex
          ref={innerRef}
          sx={{
            ...inputStyles.field,
            p: 0,
            overflow: 'hidden',
            h: 'auto',
            minH: 10,
          }}
          {...innerProps}
          {...(isFocused && { 'data-focus': true })}
          {...(isDisabled && { disabled: true })}
        >
          {children}
        </Flex>
      </StylesProvider>
    )
  },
  MultiValueContainer: ({ children, innerRef, innerProps, data: { isFixed } }: any) => (
    <Tag ref={innerRef} {...innerProps} m="0.125rem" variant={isFixed ? 'solid' : 'subtle'}>
      {children}
    </Tag>
  ),
  MultiValueLabel: ({ children, innerRef, innerProps }: any) => (
    <TagLabel ref={innerRef} {...innerProps}>
      {children}
    </TagLabel>
  ),
  MultiValueRemove: ({ children, innerRef, innerProps, data: { isFixed } }: any) => {
    if (isFixed) {
      return null
    }

    return (
      <TagCloseButton ref={innerRef} {...innerProps}>
        {children}
      </TagCloseButton>
    )
  },
  IndicatorSeparator: ({ innerRef, innerProps }: any) => (
    <Divider ref={innerRef} {...innerProps} orientation="vertical" opacity="1" />
  ),
  ClearIndicator: ({ innerRef, innerProps }: any) => (
    <CloseButton ref={innerRef} {...innerProps} size="sm" mx={2} />
  ),
  DropdownIndicator: ({ innerRef, innerProps }: any) => {
    const { addon } = useStyles()

    return (
      <Center
        ref={innerRef}
        {...innerProps}
        sx={{
          ...addon,
          bg: 'white',
          h: '100%',
          borderRadius: 0,
          borderWidth: 0,
          cursor: 'pointer',
        }}
      >
        <SearchIcon color="blue.400" h={3} w={3} />
      </Center>
    )
  },
  // Menu components
  MenuPortal: ({ innerRef, innerProps, children }: any) => (
    <Portal ref={innerRef} {...innerProps}>
      {children}
    </Portal>
  ),
  Menu: ({ children, ...props }: any) => {
    const menuStyles = useMultiStyleConfig('Menu', {})
    return (
      <selectComponents.Menu {...props}>
        <StylesProvider value={menuStyles}>{children}</StylesProvider>
      </selectComponents.Menu>
    )
  },
  MenuList: ({ innerRef, innerProps, children, maxHeight }: any) => {
    const { list } = useStyles()
    const chakraTheme = useTheme()
    return (
      <Box
        sx={{
          ...list,
          bg: mode(chakraTheme.colors.whiteAlpha[100], chakraTheme.colors.gray[900]),
          color: mode('gray.600', 'inherit'),
          maxH: `${maxHeight}px`,
          overflowY: 'auto',
        }}
        ref={innerRef}
        {...innerProps}
      >
        {children}
      </Box>
    )
  },
  GroupHeading: ({ innerProps, children }: any) => {
    const { groupTitle } = useStyles()
    return (
      <Box sx={groupTitle} {...innerProps}>
        {children}
      </Box>
    )
  },
  Option: ({ innerRef, innerProps, children, isFocused, isDisabled }: any) => {
    const { item }: any = useStyles()
    return (
      <Box
        as="button"
        sx={{
          ...item,
          w: '100%',
          textAlign: 'left',
          bg: isFocused ? item._focus.bg : 'transparent',
          ...(isDisabled && item._disabled),
        }}
        ref={innerRef}
        {...innerProps}
        {...(isDisabled && { disabled: true })}
      >
        {children}
      </Box>
    )
  },
}

const Search = ({ name = '', styles = {}, components = {}, theme = {}, ...props }: any) => {
  const chakraTheme = useTheme()
  const placeholderColor = mode(chakraTheme.colors.gray[400], chakraTheme.colors.whiteAlpha[400])

  return (
    <Select
      name={name}
      components={{
        ...chakraComponents,
        ...components,
      }}
      styles={{
        ...chakraStyles,
        ...styles,
      }}
      theme={(baseTheme) => ({
        ...baseTheme,
        borderRadius: chakraTheme.radii.md,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor, // placeholder text color
          neutral40: placeholderColor, // noOptionsMessage color
          ...theme.colors,
        },
        spacing: {
          ...baseTheme.spacing,
          ...theme.spacing,
        },
      })}
      {...props}
    />
  )
}

export default Search
