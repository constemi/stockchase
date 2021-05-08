import React, { useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'

interface CaptchaProps {
  hasFocus: boolean
  onSolve: (solution: string) => void
}

export const Captcha = (props: CaptchaProps) => {
  const { WidgetInstance } = require('friendly-challenge')
  const container = useRef<HTMLDivElement>(null)
  const widget = useRef<typeof WidgetInstance>()

  useEffect(() => {
    const doneCallback = (solution: string) => {
      //   console.log('Captcha was solved. The form can be submitted.')
      //   console.log(solution)
      props.onSolve(solution)
    }

    const errorCallback = (err: Error) => {
      console.log('There was an error when trying to solve the Captcha.')
      console.log(err)
    }

    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: 'click',
        doneCallback: doneCallback,
        errorCallback: errorCallback,
      })
    }

    // return () => {
    //   if (widget.current != undefined) widget.current.reset()
    // }
  }, [container, props, WidgetInstance])

  return props.hasFocus ? (
    <Box py="2">
      <div ref={container} className="frc-captcha" data-sitekey="FCMJNKU478J72KST" />
    </Box>
  ) : null
}
