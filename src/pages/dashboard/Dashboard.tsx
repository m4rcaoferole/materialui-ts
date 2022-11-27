import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { Toolbar } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';

export const Dashboard = () => {
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [totalCountCities, setTotalCountCities] = useState(0);

  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [totalCountPeople, setTotalCountPeople] = useState(0);

  useEffect(() => {
    setIsLoadingCities(true);
    setIsLoadingPeople(true);
    
    CidadesService.getAll(1)
      .then((result) => {
        setIsLoadingCities(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountCities(result.totalCount);
        }
      });
    
    PessoasService.getAll(1)
      .then((result) => {
        setIsLoadingPeople(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCountPeople(result.totalCount);
        }
      });
  }, []);


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
                    { !isLoadingCities &&(
                      <Typography variant='h1'>
                        {totalCountCities}
                      </Typography>
                    )}
                    { isLoadingCities && (
                      <Typography variant='h4'>
                        Carregando...
                      </Typography>
                    )}
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
                    { !isLoadingPeople &&(
                      <Typography variant='h1'>
                        {totalCountPeople}
                      </Typography>
                    )}
                    { isLoadingPeople && (
                      <Typography variant='h4'>
                        Carregando...
                      </Typography>
                    )}
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
