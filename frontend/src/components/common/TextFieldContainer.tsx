import React from 'react'
import { Box } from '@mui/material'
import Text from './Text'

type TextFieldContainerProps = {
  label: string
  children: React.ReactNode
  width?: string | object
  direction ?: string | any
  required?: boolean
  sx?: object
}

const TextFieldContainer = ({
  label,
  children,
  width = { xs: '100%'},
  direction = 'ltr',
  required = false,
  sx
}: TextFieldContainerProps) => (
  <Box
    display='flex'
    marginBottom={'0 !important'}
    flexDirection='column'
    sx={{ width ,
      direction

    }}
    mb={{ xs: 2, sm: 1 }}
  >
    <Text  fontSize='.87rem' fontWeight='600' sx={sx}>{label}{required && '*'}</Text>
    {children}
  </Box>
)

export default TextFieldContainer
