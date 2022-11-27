import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';

import { useDebounce } from '../../../shared/hooks';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';

type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName,
    registerField,
    defaultValue,
    error,
    clearError 
  } = useField('cidadeId');
  const {debounce} = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue:() => selectedId, 
      setValue:(_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            //alert(result.message);
          } else {
            setOptions(result.data.map(city => (
              { id: city.id, label: city.nome }
            )));
          }
        });
    });
  },[busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;
    
    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedOption) return null;
    
    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      disablePortal
      clearText='Limpar'
      openText='Abrir'
      closeText='Fechar'
      noOptionsText="Sem opções"
      loadingText='Carregando...'
      options={options}
      loading={isLoading}
      value={autoCompleteSelectedOption}
      disabled={isExternalLoading}
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca('');
        clearError();
      }}
      popupIcon={ (isExternalLoading || isLoading) 
        ? <CircularProgress size={28} /> 
        : undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          
          error={!!error}
          helperText={error}
          label="Cidade"
        />
      )}
    />
  );
};