import { getConfig } from '../../../configs/sistemaConfig';
import { APIBg } from './baseService/baseService';
import { message } from 'antd';

interface Boletim {
  inputName: any;
}

export async function getBoletim(url: any) {
  try {
    const response = await APIBg.get(url, getConfig('priv'));
    return response;
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível carregar os boletim, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the boletim list.${error}`,
    );
  }
  return false;
}

export async function postBoletim(boletim: Boletim) {
  try {
    await APIBg.post('/boletim', boletim, getConfig('priv'));
    message.success('cadastrado com sucesso');
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export const updateBoletim = async (boletim: Boletim, id: any) => {
  try {
    await APIBg.put(`boletim/${id}`, boletim, getConfig('priv'));
    message.success('Editado com sucesso');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível editar os boletim, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the boletim list.${error}`,
    );
  }
};

export async function deleteBoletim(id: any) {
  try {
    await APIBg.delete(`boletim/${id}`, getConfig('priv'));
    message.warning('boletim excluido');
  } catch (error) {
    if (error === 500) {
      message.info('O tempo da sua sessão expirou, faça o login novamente');
    } else if (error !== 401) {
      message.error(
        'Não foi possível deletar os boletim, tente novamente mais tarde.',
      );
    }
    console.error(
      `An unexpected error occurred while retrieving the boletim list .${error}`,
    );
  }
}
