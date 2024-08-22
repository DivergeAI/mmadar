import { createTheme } from "@mui/material";

const LightTheme = createTheme({
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
            padding: '0%',
            minHeight: '40%',
            maxHeight: '70%',
            '@media (max-width: 600px)': {
              width: '100%',
            },
            '@media (min-width: 600px) and (max-width: 900px)': {
              width: '70%',
            },
            '@media (min-width: 900px)': {
              width: '60%',
              maxWidth: '1000px',
            },
          },
        },
      },
      MuiDialogContent: {
        defaultProps: {
          dividers: false,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#FAFAFA',
            border: '1px solid #DDDDDD',
            borderRadius: '16px',
            boxShadow: 'none',
            width: '100%',
            '@media (max-width: 600px)': {
              width: '100%',
            },
            // '@media (min-width: 600px) and (max-width: 900px)': {
            //   width: '90%',
            // },
            // '@media (min-width: 900px)': {
            //   width: '260px',
            // },
            height: '467px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#DDDDDD',
            },
            fieldset: {
              border: '1px solid #DDDDDD',
              borderRadius: 8,
            },
            input: {
              padding : '0.5rem 0.9rem',
              '&[type=number]': {
                '-moz-appearance': 'textfield',
              },
              '&::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
              '&::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
              '& .MuiInputBase-input-MuiOutlinedInput-input':{
                // padding : '1rem'
  
              },
              '&[placeholder]': {
  fontSize : '14px',
              }
  
            },
          },
        },
        defaultProps: {
          InputProps: {
            sx: {
              color: '#0D0D0D',
              font: 'normal normal normal 18px/12px Open Sans',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'warning' && {
                '&:disabled': {
                backgroundColor: '#FFC107',
                color: '#fff',
                }
              }),
          }),
        },
      },
      
      
    },
    typography: {
    //   fontFamily: 'Dubai',
      allVariants: {
        color: '#0D0D0D',
      },
    },
  
    
    palette: {
        background : {
            default : '#FFFFFF',
            paper : '#F9F9F9',
        },
      grey: {
        200 : '#F9F9F9',
        300 : 'rgb(236 236 236)',
        800 : '#262626'
      },
      primary: {
        main: '#9657C8',
      },
      secondary: {
        main: '#DDDDDD',
      },
      info: {
        main: '#007BFF',
      },
      success: {
        main: '#28A745',
      },
      warning: {
        main: '#FFC107',
      },
      error: {
        main: '#DC3545',
      },
    },
   
    
  })

  export default LightTheme;