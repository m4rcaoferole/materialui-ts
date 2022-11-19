import { Box, Button, Divider, Icon, Paper, useTheme } from '@mui/material';

export const ToolbarDetail: React.FC = () => {
  const theme = useTheme();

  return(
    <Box
      component={Paper}
      display="flex"
      alignItems="center"
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      height={theme.spacing(5)}
    >
      <Button
        color="primary"
        disableElevation
        variant='contained'
        endIcon={<Icon>save</Icon>}
      >Salvar</Button>

      <Button
        color="primary"
        disableElevation
        variant='outlined'
        endIcon={<Icon>save</Icon>}
      >Salvar e Voltar</Button>

      <Button
        color="primary"
        disableElevation
        variant='outlined'
        endIcon={<Icon>delete</Icon>}
      >Apagar</Button>

      <Button
        color="primary"
        disableElevation
        variant='outlined'
        endIcon={<Icon>add</Icon>}
      >Novo</Button>

      <Divider variant='middle' orientation='vertical' />

      <Button
        color="primary"
        disableElevation
        variant='outlined'
        endIcon={<Icon>arrow_back</Icon>}
      >Voltar</Button>
    </Box>
  );
};