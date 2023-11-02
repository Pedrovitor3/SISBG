import { getConfig } from '../../../configs/sistemaConfig';
import { APIBg } from './baseService/baseService';
import { message } from 'antd';

interface Bloco {
  inputName: any;
}

export async function getBloco(url: any) {
  try {
    const response = await APIBg.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar os bloco, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the bloco list.${error}`,
    );
  }
  return false;
}

export async function postBloco(bloco: Bloco) {
  try {
    await APIBg.post('/bloco', bloco, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export const updateBloco = async (bloco: Bloco, id: any) => {
  try {
    await APIBg.put(`bloco/${id}`, bloco, getConfig('priv'));
    message.success('Editado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível editar os bloco, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the bloco list.${error}`,
    );
  }
};

export async function deleteBloco(id: any) {
  try {
    await APIBg.delete(`bloco/${id}`, getConfig('priv'));
    message.warning('bloco excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível deletar os bloco, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the bloco list .${error}`,
    );
  }
}
