import { FormControl, Flex, Input, InputProps, Text, HStack, useColorModeValue } from "@chakra-ui/react"
import * as React from "react"
import { useFormContext, FieldError } from "react-hook-form"
import { InlineInputLabel } from "./InputLabel"

interface Props extends InputProps {
  name: string
  label?: string
  subLabel?: string
}

export const InlineDurationInput = ({ label, subLabel, ...props }: Props) => {
  const { register, unregister, watch, errors, setValue } = useFormContext()

  const hoursRef = React.useRef<HTMLInputElement>(null)
  const minutesRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    register(props.name)
    return () => unregister(props.name)
  }, [register, unregister, props.name])

  const fieldError = errors?.[props.name] as FieldError | string
  const color = useColorModeValue("gray.500", "gray.300")

  const duration = watch(props.name) as string
  const hours = duration.split(":")[0] || ""
  const minutes = duration.split(":")[1] || ""

  return (
    <FormControl isInvalid={!!fieldError} isRequired={props.isRequired}>
      <Flex align="center">
        <InlineInputLabel label={label} subLabel={subLabel} name={props.name} />
        <HStack align="center">
          <HStack align="center">
            <Input
              ref={hoursRef}
              size="sm"
              px={0}
              min={0}
              value={hours}
              onFocus={() => hoursRef.current?.select()}
              onChange={(e) => setValue(props.name, `${e.target.value}:${minutes}`)}
              textAlign="center"
              bg="transparent"
              type="number"
              boxSize="30px"
            />
            <Text color={color} fontSize="0.7rem">
              Hours
            </Text>
          </HStack>
          <HStack align="center">
            <Input
              ref={minutesRef}
              size="sm"
              min={0}
              max={60}
              onFocus={() => minutesRef.current?.select()}
              px={0}
              value={minutes}
              onChange={(e) => setValue(props.name, `${hours}:${e.target.value}`)}
              textAlign="center"
              bg="transparent"
              type="number"
              boxSize="30px"
            />
            <Text color={color} fontSize="0.7rem">
              Minutes
            </Text>
          </HStack>
        </HStack>
      </Flex>
    </FormControl>
  )
}
