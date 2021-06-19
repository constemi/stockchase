import React, { cloneElement } from 'react'
import ReactSelect, {
  components as selectComponents,
  Props as SelectProps,
  GroupTypeBase,
  OptionTypeBase,
  Theme,
} from 'react-select'
import AsyncReactSelect from 'react-select/async'
import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Divider,
  CloseButton,
  Center,
  Box,
  Portal,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
  // ThemeConfig,
  createIcon,
  RecursiveCSSObject,
  CSSWithMultiValues,
  useColorModeValue as mode,
} from '@chakra-ui/react'

// Taken from the @chakra-ui/icons package to prevent needing it as a dependency
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx
const SearchIcon = createIcon({
  d:
    'M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z',
  displayName: 'SearchIcon',
})

interface ItemProps extends CSSWithMultiValues {
  _disabled: CSSWithMultiValues
  _focus: CSSWithMultiValues
}

// Custom styles for components which do not have a chakra equivalent
const chakraStyles: SelectProps['styles'] = {
  input: (provided) => ({
    ...provided,
    color: 'inherit',
    lineHeight: 1,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: 'none',
  }),
  valueContainer: (provided, { selectProps: { size } }) => {
    const px = {
      sm: '0.75rem',
      md: '1rem',
      lg: '1rem',
    }

    return {
      ...provided,
      padding: `0.125rem ${px[size as keyof typeof px]}`,
    }
  },
  loadingMessage: (provided, { selectProps: { size } }) => {
    const fontSizes = {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
    }

    const paddings = {
      sm: '6px 9px',
      md: '8px 12px',
      lg: '10px 15px',
    }

    return {
      ...provided,
      fontSize: fontSizes[size as keyof typeof fontSizes],
      padding: paddings[size as keyof typeof paddings],
    }
  },
  // Add the chakra style for when a TagCloseButton has focus
  // multiValueRemove: (provided, { isFocused, selectProps: { multiValueRemoveFocusStyle } }) =>
  //   isFocused ? multiValueRemoveFocusStyle : {},
  control: () => ({}),
  menuList: () => ({}),
  option: () => ({}),
  multiValue: () => ({}),
  multiValueLabel: () => ({}),
  group: () => ({}),
}

const chakraComponents: SelectProps['components'] = {
  // Control components
  Control: ({ children, innerRef, innerProps, isDisabled, isFocused, selectProps: { size } }) => {
    const inputStyles = useMultiStyleConfig('Input', { size })

    const heights = {
      sm: 8,
      md: 10,
      lg: 12,
    }

    return (
      <StylesProvider value={inputStyles}>
        <Flex
          ref={innerRef}
          sx={{
            ...inputStyles.field,
            p: 0,
            overflow: 'hidden',
            h: 'auto',
            minH: heights[size as keyof typeof heights],
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
  SingleValue: ({ children, innerProps }) => <TagLabel {...innerProps}>{children}</TagLabel>,
  MultiValueContainer: ({ children, innerRef, innerProps, data: { isFixed }, selectProps: { size } }) => (
    <Tag
      ref={innerRef}
      {...innerProps}
      m="0.125rem"
      // react-select Fixed Options example: https://react-select.com/home#fixed-options
      variant={isFixed ? 'solid' : 'subtle'}
      size={size}
    >
      {children}
    </Tag>
  ),
  MultiValueLabel: ({ children, innerRef, innerProps }) => (
    <TagLabel ref={innerRef} {...innerProps}>
      {children}
    </TagLabel>
  ),
  MultiValueRemove: ({ children, innerRef, innerProps, data: { isFixed } }) => {
    if (isFixed) {
      return null
    }

    return (
      <TagCloseButton ref={innerRef} {...innerProps} tabIndex={-1}>
        {children}
      </TagCloseButton>
    )
  },
  IndicatorSeparator: ({ innerProps }) => <Divider {...innerProps} orientation="vertical" opacity="1" />,
  ClearIndicator: ({ innerProps, selectProps: { size } }) => (
    <CloseButton {...innerProps} size={size} mx={2} tabIndex={-1} />
  ),
  DropdownIndicator: ({ innerProps, selectProps: { size } }) => {
    const { addon } = useStyles()

    const iconSizes = {
      sm: 3,
      md: 4,
      lg: 5,
    }
    const iconSize = iconSizes[size as keyof typeof iconSizes]

    return (
      <Center
        {...innerProps}
        sx={{
          ...addon,
          h: '100%',
          borderRadius: 0,
          borderWidth: 0,
          cursor: 'pointer',
        }}
      >
        <SearchIcon h={iconSize} w={iconSize} color={mode('gray.700', 'whiteAlpha.900')} />
      </Center>
    )
  },
  // Menu components
  MenuPortal: ({ children }) => <Portal>{children}</Portal>,
  Menu: ({ children, ...props }) => {
    const menuStyles = useMultiStyleConfig('Menu', {})
    return (
      <selectComponents.Menu {...props}>
        <StylesProvider value={menuStyles}>{children}</StylesProvider>
      </selectComponents.Menu>
    )
  },
  MenuList: ({ innerRef, children, maxHeight }) => {
    const { list } = useStyles()
    return (
      <Box
        sx={{
          ...list,
          maxH: `${maxHeight}px`,
          overflowY: 'auto',
        }}
        ref={innerRef}
      >
        {children}
      </Box>
    )
  },
  GroupHeading: ({ innerProps, children }) => {
    const { groupTitle } = useStyles()
    return (
      <Box sx={groupTitle} {...innerProps}>
        {children}
      </Box>
    )
  },
  Option: ({ innerRef, innerProps, children, isFocused, isDisabled, selectProps: { size } }) => {
    const { item } = useStyles()
    return (
      <Box
        role="button"
        sx={{
          ...item,
          w: '100%',
          textAlign: 'left',
          color: mode('gray.600', 'whiteAlpha.900'),
          bg: isFocused ? (item as RecursiveCSSObject<ItemProps>)._focus.bg : 'transparent',
          fontSize: size,
          ...(isDisabled && (item as RecursiveCSSObject<ItemProps>)._disabled),
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

export function ChakraReactSelect<
  OptionType extends OptionTypeBase = { label: string; value: string },
  IsMulti extends boolean = false,
  GroupType extends GroupTypeBase<OptionType> = GroupTypeBase<OptionType>
>({
  children,
  styles = {},
  components = {},
  theme = (theme: Theme) => theme,
  size = 'md',
  ...props
}: SelectProps<OptionType, IsMulti, GroupType>) {
  const chakraTheme = useTheme()

  // The chakra theme styles for TagCloseButton when focused
  const closeButtonFocus = chakraTheme.components.Tag.baseStyle.closeButton._focus
  const multiValueRemoveFocusStyle = {
    background: closeButtonFocus.bg,
    boxShadow: chakraTheme.shadows[closeButtonFocus.boxShadow],
  }

  // The chakra UI global placeholder color
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
  const placeholderColor = mode(chakraTheme.colors.gray[400], chakraTheme.colors.whiteAlpha[400])

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  let realSize = size
  const sizeOptions = ['sm', 'md', 'lg']
  if (!sizeOptions.includes(size)) {
    realSize = 'md'
  }

  const select = cloneElement(children, {
    components: {
      ...chakraComponents,
      ...components,
    },
    styles: {
      ...chakraStyles,
      ...styles,
    },
    theme: (baseTheme: Theme) => {
      // @ts-expect-error: ts cannot parse theme properly
      const propTheme = theme(baseTheme)
      // const propTheme = theme

      return {
        ...baseTheme,
        ...propTheme,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor, // placeholder text color
          neutral40: placeholderColor, // noOptionsMessage color
          ...propTheme.colors,
        },
        spacing: {
          ...baseTheme.spacing,
          ...propTheme.spacing,
        },
      }
    },
    size: realSize,
    multiValueRemoveFocusStyle,
    ...props,
  })

  return select
}

function Select<
  OptionType extends OptionTypeBase = { label: string; value: string },
  IsMulti extends boolean = false,
  GroupType extends GroupTypeBase<OptionType> = GroupTypeBase<OptionType>
>(props: SelectProps<OptionType, IsMulti, GroupType>) {
  return (
    <ChakraReactSelect {...props}>
      <ReactSelect />
    </ChakraReactSelect>
  )
}

function AsyncSelect<
  OptionType extends OptionTypeBase = { label: string; value: string },
  IsMulti extends boolean = false,
  GroupType extends GroupTypeBase<OptionType> = GroupTypeBase<OptionType>
>(props: SelectProps<OptionType, IsMulti, GroupType>) {
  return (
    <ChakraReactSelect {...props}>
      <AsyncReactSelect />
    </ChakraReactSelect>
  )
}

export { Select as default, AsyncSelect }
