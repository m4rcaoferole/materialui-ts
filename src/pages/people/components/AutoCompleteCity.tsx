import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';

type TAutoCompleteCity = {
  id: number;
  label: string;
}

export const AutoCompleteCity: React.FC = () => {
  const {debounce} = useDebounce();

  const [options, setOptions] = useState<TAutoCompleteCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            //alert(result.message);
          } else {
            console.log(result);

            setOptions(result.data.map(city => ({ id: city.id, label: city.nome })));
          }
        });
    });
  },[busca]);

  return (
    <Autocomplete 
      loading={isLoading}
      options={options}
      onInputChange={(_, newValue) => setBusca(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}

          label="Cidade"
        />
      )}
    />
  );
};