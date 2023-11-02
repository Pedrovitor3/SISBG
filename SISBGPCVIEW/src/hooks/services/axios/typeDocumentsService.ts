import { getConfig } from '../../../configs/sistemaConfig';
import { APIBg } from './baseService/baseService';
import { message } from 'antd';

interface TypeDocuments {
  inputName: any;
}

export async function getTypeDocuments(url: any) {
  try {
    const response = await APIBg.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista dos tipos de documento, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the document types list.${error}`,
    );
  }
  return false;
}

export async function postTypeDocuments(typeDocuments: TypeDocuments) {
  try {
    await APIBg.post('/typeDocuments', typeDocuments, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export const updateTypeDocuments = async (
  typeDocuments: TypeDocuments,
  id: any,
) => {
  try {
    await APIBg.put(`typeDocuments/${id}`, typeDocuments, getConfig('priv'));
    message.success('Editado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível editar o tipo de documento, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the document types list.${error}`,
    );
  }
};

export async function deleteTypeDocuments(id: any) {
  try {
    await APIBg.delete(`typeDocuments/${id}`, getConfig('priv'));
    message.warning('Tipo do documento excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível deletar o tipo de documento, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the document types list.${error}`,
    );
  }
}
