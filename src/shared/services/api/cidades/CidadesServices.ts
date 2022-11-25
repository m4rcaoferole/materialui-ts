import { Environment } from '../../../environment';
import { api } from '../axi-config';

export interface IListagemCidade {
  id: number;
  nome: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
}

export type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
  try {
    const ulrRelative =`/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

    const { data, headers } = await api.get(ulrRelative);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }

    return new Error('Erro ao listar os registros.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await api.get(`/cidades/${id}`);

    if(data) {
      return data;
    }

    return new Error('Erro ao consultar o Registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o Registro.');
  }
};

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await api.post<IDetalheCidade>('/cidades', dados);

    if(data) {
      return data.id;
    }

    return new Error('Erro ao criar o Registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao criar o Registro.');
  }
};

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
  try {
    await api.put(`/cidades/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o Registro.');
  }
};

const deleteById= async (id: number): Promise<void | Error> => {
  try {
    await api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o Registro.');
  }
};


export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};