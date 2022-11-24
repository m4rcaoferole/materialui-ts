import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

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

        <VTextField placeholder='Nome Completo' name='nomeCompleto' />
        <VTextField placeholder='Email' name='email' />
        <VTextField placeholder='Id Cidade' name='cidadeId' />
        
      </Form>


      {/* { isLoading && (
        <LinearProgress variant="indeterminate" />
      )}

      <p> Detalhe de Pessoa {id}</p> */}
    </LayoutBasePage>
  );
};