import React, { forwardRef } from 'react';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/system';
import { useTheme } from '@mui/material';

type TextProps = {
    fontWeight?: string;
    fontSize?: string;
    color?: string;
    children?: React.ReactNode;
    lines?: number;
    sx?: SxProps<Theme>;
    dangerouslySetInnerHTML?: {
        __html: string;
    };
    props?: any;
};

// Forwarding the ref and props
const Text = forwardRef<HTMLSpanElement, TextProps>(({
    fontWeight = '400',
    fontSize = '14px',
    color = 'grey.800',
    children,
    lines,
    sx = {},
    dangerouslySetInnerHTML,
    ...props
}, ref) => {  // Correct: `ref` is passed as the second argument separately

    const theme = useTheme();

    return (
        <Typography
            ref={ref}  // Forward the ref to the Typography component
            sx={{
                fontWeight,
                fontFamily: 'system-ui !important',
                fontSize,
                color: color || theme.palette.grey[800],
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: lines,
                WebkitBoxOrient: 'vertical',
                ...sx,
            }}
            dangerouslySetInnerHTML={dangerouslySetInnerHTML}
            {...props}  // Spread additional props
        >
            {children}
        </Typography>
    );
});

Text.displayName = 'Text';  // Optional: setting display name for debugging

export default Text;
