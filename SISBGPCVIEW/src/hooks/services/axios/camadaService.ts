import { getConfig } from '../../../configs/sistemaConfig';
import { APIBg } from './baseService/baseService';
import { message } from 'antd';

interface Camada {
  inputName: any;
}

export async function getCamada(url: any) {
  try {
    const response = await APIBg.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível obter a lista das camadas, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the document camada list.${error}`,
    );
  }
  return false;
}

export async function postCamada(camada: Camada) {
  try {
    await APIBg.post('/camada', camada, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export const updateCamada = async (camada: Camada, id: any) => {
  try {
    await APIBg.put(`camada/${id}`, camada, getConfig('priv'));
    message.success('Editado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível editar a camada, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the camada list.${error}`,
    );
  }
};

export async function deleteCamada(id: any) {
  try {
    await APIBg.delete(`camada/${id}`, getConfig('priv'));
    message.warning('camada excluida');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível deletar a camada, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the camada list.${error}`,
    );
  }
}
