import { Box } from '@mui/material';

export const TimeTable: React.VFC = () => {
  return (
    <Box>
      {[...Array(6)]
        .map((_, i) => i)
        .map((n) => (
          <Box key={n} sx={{ display: 'flex', flexDirection: 'row' }}>
            {[...Array(5)]
              .map((_, i) => i)
              .map((n) => (
                <Box
                  key={n}
                  sx={{
                    height: 80,
                    width: 80,
                    margin: 1,
                    boxShadow: 4,
                    borderRadius: '20px',
                  }}
                />
              ))}
          </Box>
        ))}
    </Box>
  );
};
