import { message } from 'antd';
import { APIBg } from './baseService/baseService';
import { getConfig } from '../../../configs/sistemaConfig';

interface Arquivo {
  inputName: any;
}
export async function getArquivo(url: any) {
  try {
    const response = await APIBg.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar o arquivo, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the Arquivo list.${error}`,
    );
  }
  return false;
}

export async function postArquivo(arquivo: any) {
  try {
    const response = await APIBg.post('/arquivo', arquivo, getConfig('priv'));
    // message.success('cadastrado com sucesso');
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export const updateArquivo = async (arquivo: any, id: any) => {
  try {
    const response = await APIBg.put(
      `arquivo/${id}`,
      arquivo,
      getConfig('priv'),
    );
    //message.success('editado com sucesso');
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível editar o arquivo, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the Arquivo list.${error}`,
    );
  }
};

export async function deleteArquivo(id: any) {
  try {
    await APIBg.delete(`arquivo/${id}`, getConfig('priv'));
    // message.warning('arquivo excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível deletar o arquivo, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the Arquivos list.${error}`,
    );
  }
}
