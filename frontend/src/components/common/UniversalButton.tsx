import { Button, Icon, SxProps } from '@mui/material'
import { Theme } from '@mui/system'
import React from 'react'

type UniversalButtonProps = {
  label: string | React.ReactNode
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
  startIcon ?: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
} & React.ComponentProps<typeof Button> // Extend from MUI Button props

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
  startIcon,
  sx,
  ...props // Spread remaining props here
}: UniversalButtonProps) => {
  return (
    <Button
      variant={variant}
      startIcon={startIcon && (
        <Icon fontSize="small" sx={{ display: 'flex' }}>
          {startIcon}
        </Icon>
      )}
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
        '&.Mui-disabled': {
          background: `${backgroundColor} !important`,
        },
        ...sx,
      }}
      {...props} // Pass the additional props dynamically
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </Button>
  )
}

export default UniversalButton
