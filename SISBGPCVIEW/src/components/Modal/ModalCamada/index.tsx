import { Modal, Form, Input, Col, message } from 'antd';
import { useEffect } from 'react';
import {
  getCamada,
  postCamada,
  updateCamada,
} from '../../../hooks/services/axios/camadaService';

type Props = {
  updateCamadaList: any;
  id: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalCamada = ({
  updateCamadaList,
  id,
  closeModal,
  openModal,
}: Props) => {
  const [form] = Form.useForm();

  const handleOk = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(() => {
        if (id) {
          submitUpdate();
        } else {
          submitCreate();
        }
        form.resetFields();
        closeModal(true);
      })
      .catch(errorInfo => message.error('Erro no preenchimento dos campos.'));
  };

  useEffect(() => {
    loadingCamada();
  }, [id]);

  useEffect(() => {
    loadingCamada();
  }, []);

  const loadingCamada = async () => {
    if (id) {
      await getCamada(`camada/${id}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            sigla: response.data.sigla,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter as camadas.');
        }
      });
    }
  };

  const submitUpdate = async () => {
    const editingCamada = form.getFieldsValue(true);
    if (id) {
      await updateCamada(editingCamada, id);
      updateCamadaList(editingCamada);
    }
  };

  const submitCreate = async () => {
    const editingCamada = form.getFieldsValue(true);
    await postCamada(editingCamada);
    updateCamadaList(editingCamada); // Chama a função updateAxleList com o novo axle
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Camada"
        okText="Salvar"
        onCancel={() => {
          form.resetFields();
          closeModal(false);
        }}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
          <Col offset={1} span={21}>
            <Form.Item
              name="name"
              label="Nome"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o nome',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1} span={12}>
            <Form.Item
              name="sigla"
              label="Sigla"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a descrição',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCamada;
