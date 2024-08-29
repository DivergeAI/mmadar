import React from 'react'
import { Box } from '@mui/material'
import Text from './Text'

type TextFieldContainerProps = {
  label: string
  children: React.ReactNode
  width?: string | object
  direction ?: string | any
  required?: boolean
}

const TextFieldContainer = ({
  label,
  children,
  width = { xs: '100%'},
  direction = 'ltr',
  required = false
}: TextFieldContainerProps) => (
  <Box
    display='flex'
    flexDirection='column'
    sx={{ width ,
      direction

    }}
    mb={{ xs: 2, sm: 0 }}
  >
    <Text color='grey.800' fontSize='.87rem' fontWeight='600'>{label}{required && '*'}</Text>
    {children}
  </Box>
)

export default TextFieldContainer
