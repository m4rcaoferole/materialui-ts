import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { ToolbarDetail } from '../../shared/components';
import { LayoutBasePage } from '../../shared/layouts';
import { VTextField } from '../../shared/forms';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetailPeople = () => {
  const { id = '' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pessoas');
          } else {
            setNome(result.nomeCompleto);
            console.log(result);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nomeCompleto: '',
        cidadeId: '',
        email: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (id === 'nova') {
      PessoasService
        .create(dados)
        .then((result) => {
          setIsLoading(false);
          
          if (result instanceof Error) {
            alert(result.message);
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        });
    } else {
      PessoasService
        .updateById(Number(id), { id: Number(id), ...dados })
        .then((result) => {
          setIsLoading(false);
          
          if (result instanceof Error) {
            alert(result.message);
          }
        });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro apagado com sucesso!');
            navigate('/pessoas');
          }
        }); 
    }
  };

  return (
    <LayoutBasePage
      title={id === 'nova' ? 'Nova pessoa' : nome}
      toolbar={
        <ToolbarDetail
          textNewButton='Nova'
          showButtonSaveClose
          showButtonNew={id !== 'nova'}
          showButtonDelete={id !== 'nova'}

          clickBackButton={() => navigate('/pessoas')}
          clickDeleteButton={() => handleDelete(Number(id))}
          clickSaveButton={() => formRef.current?.submitForm()}
          clickNewButton={() => navigate('/pessoas/detalhe/nova')}
          clickSaveAndCloseButton={() => formRef.current?.submitForm()}
        />
      }
    >

      <Form ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection='column' component={Paper} variant="outlined">

          <Grid container direction="column" padding={1} spacing={2}>

            { isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Nome Completo' 
                  name='nomeCompleto'
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
            </Grid>


            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth 
                  label='Email' 
                  name='email'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>


            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth 
                  label='Cidade' 
                  name='cidadeId'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>
        </Box>        
      </Form>

    </LayoutBasePage>
  );
};