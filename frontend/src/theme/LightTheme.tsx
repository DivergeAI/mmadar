import { createTheme } from "@mui/material";
import type {} from '@mui/x-data-grid/themeAugmentation';


const LightTheme = createTheme({
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FAFAFA',
            borderRadius: "12px",
            padding: '0%',
            minHeight: 'fit-content',
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
              fontFamily : 'system-ui',
              '& MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                minHeight : 'unset !important',
              },
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
              '& .MuiInputBase-input':{
                
                // padding : '1rem'
  
              },
              '&[placeholder]': {
  fontSize : '14px !important',
  // fontFamily : 'system-ui',
              },
             
  
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
          root: {
          '&:hover': {
            border : 'none',
          },
          '&:focus': {
            outline : 'none',
          
          }

        },
      },
    },
      MuiButtonBase:{
        styleOverrides :{
          root : {
            padding : '0',
            
          },
          
        },

      },
      MuiIconButton :{
        styleOverrides :{
          root : {
            padding : '0.3rem',
            borderRadius : '8px',
            '&:focus, &:focus-visible': {
              outline: 'none',
            },
          'hover' : {
            backgroundColor : 'transparent !important',
          }
          },
          
        },
      },
      MuiMenu:{
        styleOverrides :{
          paper : {
            borderRadius : '12px',
            boxShadow : '0px 4px 4px rgba(0, 0, 0, 0.25)',
          },
        },
      },
      MuiMenuItem:{
        styleOverrides :{
          root : {
            padding : '0.5rem 1rem',
            display : 'flex',
            alignItems : 'center',
            '&:hover' : {
              backgroundColor : '#F9F9F9',
            },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#262626',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontSize: '12px',
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '1.5rem',
            width : 'inherit',
            height : 'inherit',
            
          },
        },
      },
      MuiDataGrid :{
        styleOverrides :{
root:{
  border :'none !important',
  fontFamily : 'system-ui',
},

        }
      },
      MuiSelect:{
        styleOverrides:{
          root:{
            "& .MuiSelect-icon": {
              width: "24px",
              height: "24px",
            },
          }
        }
      },
      MuiGrid:{
        styleOverrides:{
          root:{
            width :'100% !important',
          }
        }
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
            main : '#0000001a'
          },
      grey: {
        200 : '#F9F9F9',
        300 : '#cdcdcd4d',
        400 : 'rgb(236 236 236)',
        500 : '#b4b4b4',
        600 : '#ececec',
        700 : '#9b9b9b',
        800 : '#262626',
        900 : '#4e4e4e',
        
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
      common: {
        white: '#FFFFFF',
        black: '#000000',
      },
      customRed: {
        main: '#fca5a5',
        light: '#f87171',
        dark: '#b91c1c',
        contrastText: '#FFFFFF',
      },

    },
   
    
  })

  export default LightTheme;