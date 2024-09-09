import { Box, Slider, Stack, useTheme } from '@mui/material';
import MuiInput from '@mui/material/Input';

type TransparentSliderProps = {
    value: number
    onChange: (e:Event , value : number | number[] ) => void
}

const TransparentSlider = ({value , onChange}: TransparentSliderProps  ) => {
    const theme =useTheme();
    return (
        <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Slider 
            track={false}
            aria-label="Custom thumb label"
            value={value}
            step={1}
            min={0}
            onChange={onChange}
            sx={{
                width: '100%',
                color: 'grey.800',
                '& .MuiSlider-thumb': {
                    width: '1rem',
                    height: '1rem',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        boxShadow: 'none',
                    }
                },
                
                '& .MuiSlider-rail': {
                    height: '.5rem',
                    // padding: '0px  !important',
                    borderRadius: '8px',
                    backgroundColor : 'common.white',
                }
            }}/>
  <MuiInput
 value={value}
            size="small"
            disableUnderline = {true}
            sx={{
                width: '4.5rem',
                textAlign: 'center',
               padding:'0 !important',
                '& .MuiInputBase-input': {
                    textAlign: 'center',
                    padding: '0px  !important',
                    fontSize: '.87rem',
                },
                '& :focus': {
                    outline: `2px solid ${theme.palette.primary.main} !important`,
                    borderRadius: '4px',
                },
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                  },
"& input[type=number]": {
                    MozAppearance: "textfield",
                  },
            }}
            inputProps={{
              step: 'any',
              min: 0,
              max: 1,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Stack>
    );
};

export default TransparentSlider;