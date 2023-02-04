import Box from '@mui/material/Box';
import React from 'react';

export default function Image({ attachment }) {
  return (
    <Box>
      <img
        src={`pubic/uploads/${attachment}`}
        height={140}
        width="auto"
        alt="uploads"
        loading="lazy"
      />
    </Box>
  );
}
