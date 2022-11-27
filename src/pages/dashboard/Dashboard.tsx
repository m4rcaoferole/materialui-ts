import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Toolbar } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <LayoutBasePage 
      title="Página Inicial"
      toolbar={<Toolbar showNewButton={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={1}>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Cidades
                  </Typography>

                  <Box padding={4} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>
                      25
                    </Typography>
                  </Box>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Pessoas
                  </Typography>

                  <Box padding={4} display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h1'>
                      25
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
