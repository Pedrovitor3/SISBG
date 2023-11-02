import { Modal, Form, Input, Col, message, Button, Row } from 'antd';
import { useEffect } from 'react';

import {
  postClassificacao,
  deleteClassificacao,
  getClassificacao,
  updateClassificacao,
} from '../../../hooks/services/axios/classificacaoService';

type Props = {
  updateClassificacaoList: any;
  id: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalClassificacao = ({
  updateClassificacaoList,
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
    loadingClassificacao();
  }, [id]);

  useEffect(() => {
    loadingClassificacao();
  }, []);

  const loadingClassificacao = async () => {
    if (id) {
      await getClassificacao(`classificacao/${id}`).then((response: any) => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
          });
        } else {
          message.error(
            'Ocorreu um erro inesperado ao obter os tipos documentos.',
          );
        }
      });
    }
  };

  const submitUpdate = async () => {
    const editingClassificacao = form.getFieldsValue(true);
    if (id) {
      await updateClassificacao(editingClassificacao, id);
      updateClassificacaoList(editingClassificacao);
    }
  };

  const submitCreate = async () => {
    const editingClassificacao = form.getFieldsValue(true);
    await postClassificacao(editingClassificacao);
    updateClassificacaoList(editingClassificacao); // Chama a função updateAxleList com o novo axle
  };

  const clickDeleteType = async () => {
    const editingClassificacao = form.getFieldsValue(true);
    if (id) {
      await deleteClassificacao(id);
      closeModal(true);
      updateClassificacaoList(editingClassificacao);
    }
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Classificacao"
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
          <Col offset={1} span={21}>
            <Form.Item
              name="description"
              label="Descrição"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a descrição',
                },
              ]}
              hasFeedback
            >
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{ height: '70px' }}
              />
            </Form.Item>
          </Col>

          <Col offset={1} span={16}>
            <Row style={{ display: 'inline-block' }}>
              <Button
                style={{ visibility: 'hidden' }}
                onClick={() => clickDeleteType()}
              >
                Deletar tipo de documento
              </Button>
            </Row>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalClassificacao;
