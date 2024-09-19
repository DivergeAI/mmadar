
import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const Skelton: React.FC = () => {
  return (
    <Box width ={'100%'} sx={{
        mt: 2,
        mb: 4,
    }}>
      <Box className="animate-pulse  w-full">
        <Box  
        my={1}
        width={'100%'}
        display={'flex'}

flexDirection={'column'}
gap={1}>
          {/* First row */}
          <Skeleton variant="rectangular" height={8} width="86%" sx={{ bgcolor: 'grey.400', borderRadius: 1 }} />

          {/* Second row */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Skeleton variant="rectangular" height={8} sx={{ bgcolor: 'grey.400', borderRadius: 1 }} />
            </Grid>
            <Grid item xs={4}>
              <Skeleton variant="rectangular" height={8} sx={{ bgcolor: 'grey.400', borderRadius: 1 }} />
            </Grid>
          </Grid>

          {/* Third row */}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={8} sx={{ bgcolor: 'grey.400', borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={8} sx={{ bgcolor: 'grey.400', borderRadius: 1 }} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={8} sx={{ bgcolor: 'grey.400', borderRadius: 1, mr: 1 }} />
            </Grid>
          </Grid>

          {/* Last row */}
          <Skeleton variant="rectangular" height={8} width="100%" sx={{ bgcolor: 'grey.400', borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Skelton;
