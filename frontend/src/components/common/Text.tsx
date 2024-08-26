import React from 'react'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/system'
import { useTheme } from '@mui/material'

type TextProps = {
    fontWeight?: string
    fontSize?: string
    color?: string
    children?: React.ReactNode
    lines?: number
    sx?: SxProps<Theme>
    dangerouslySetInnerHTML?: {
        __html: string;
    };
    props ?: any
}

const Text = ({
    fontWeight = '400',
    fontSize = '14px',
    color,
    children,
    lines,
    sx = {},

    dangerouslySetInnerHTML,
    ...props
}: TextProps) => {

    const theme = useTheme()
    return (
        <Typography
            sx={{
                fontWeight,
                fontSize,
                color: color || theme.palette.grey[800],
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: lines,
                WebkitBoxOrient: 'vertical',
                ...sx,
                ...props
            }}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        >
            {children}
        </Typography>
    )
}

export default Text
