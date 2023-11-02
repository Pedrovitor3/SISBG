import { getConfig } from '../../../configs/sistemaConfig';
import { APIBg } from './baseService/baseService';
import { message } from 'antd';

interface Classificacao {
  inputName: any;
}

export async function getClassificacao(url: any) {
  try {
    const response = await APIBg.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista das classificação tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the document classificação.${error}`,
    );
  }
  return false;
}

export async function postClassificacao(classificacao: Classificacao) {
  try {
    await APIBg.post('/classificacao', classificacao, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export const updateClassificacao = async (
  classificacao: Classificacao,
  id: any,
) => {
  try {
    await APIBg.put(`classificacao/${id}`, classificacao, getConfig('priv'));
    message.success('Editado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível editar a classificação, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the classificação list.${error}`,
    );
  }
};

export async function deleteClassificacao(id: any) {
  try {
    await APIBg.delete(`classificacao/${id}`, getConfig('priv'));
    message.warning('Tipo do documento excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível deletar a classificação, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the classificação list.${error}`,
    );
  }
}
