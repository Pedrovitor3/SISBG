import { message } from 'antd';
import { APIBg } from './baseService/baseService';
import { getConfig } from '../../../configs/sistemaConfig';

interface Documents {
  inputName: any;
}
export async function getDocuments(url: any) {
  try {
    const response = await APIBg.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar o documento, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the documents list.${error}`,
    );
  }
  return false;
}

export async function postDocuments(documents: any) {
  try {
    const response = await APIBg.post(
      '/documents',
      documents,
      getConfig('priv'),
    );
    message.success('cadastrado com sucesso');
    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export const updateDocuments = async (documents: any, id: any) => {
  try {
    const response = await APIBg.put(
      `documents/${id}`,
      documents,
      getConfig('priv'),
    );
    message.success('editado com sucesso');
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível editar o documento, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the documents list.${error}`,
    );
  }
};

export async function deleteDocuments(id: any) {
  try {
    await APIBg.delete(`documents/${id}`, getConfig('priv'));
    message.warning('documento excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível deletar o documento, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the documentss list.${error}`,
    );
  }
}
