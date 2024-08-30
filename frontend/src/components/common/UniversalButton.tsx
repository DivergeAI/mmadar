import { Button, Typography, SxProps } from '@mui/material'
import { Theme } from '@mui/system'
import React from 'react'

type UniversalButtonProps = {
  label: string | React.ReactNode
  variant?: 'text' | 'outlined' | 'contained'
  width?: string | number
  height?:
    | string
    | number
    | { xs?: string | number; sm?: string | number; md?: string | number }
    
  border?: string
  backgroundColor?: string
  textColor?: string
  fontSize?:
    | string
    | number
    | { xs?: string | number; sm?: string | number; md?: string | number }
  onClick?: () => void
  sx?: SxProps<Theme>

  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  props?: any
}

const UniversalButton = ({
  label,
  width,
  height,
  backgroundColor,
  border = '1px solid #DDDDDD',
  textColor,
  fontSize = '14px',
  onClick,
  variant = 'outlined',
  disabled,
  type = 'button',
  sx,
  ...props
}: UniversalButtonProps) => {
  return (
    <Button
      variant={variant}
      sx={{
        width,
        height,
        fontSize,
        color: textColor,
        border,
        borderRadius: '8px',
        fontWeight: '600',
        backgroundColor: disabled ? 'inherit' : backgroundColor,
        textTransform: 'none',
        '@media (max-width: 600px)': {
          height: typeof height === 'object' ? height.xs : height,
        },
        '@media (min-width: 601px) and (max-width: 960px)': {
          height: typeof height === 'object' ? height.sm : height,
        },
        '@media (min-width: 961px)': {
          height: typeof height === 'object' ? height.md : height,
        },
        "&.Mui-disabled": {
        background: `${backgroundColor} !important`,
        },
        ...sx,
      }}
      {...props}
      onClick={onClick}
      
      disabled={disabled}
      type={type}
    >
   
        {label}
    </Button>
  )
}

export default UniversalButton
 
