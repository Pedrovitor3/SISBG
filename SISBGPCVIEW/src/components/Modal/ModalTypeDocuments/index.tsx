import { Modal, Form, Input, Col, message, Button, Row } from 'antd';
import { useEffect } from 'react';

import {
  deleteTypeDocuments,
  getTypeDocuments,
  postTypeDocuments,
  updateTypeDocuments,
} from '../../../hooks/services/axios/typeDocumentsService';

type Props = {
  updateTypeDocumentsList: any;
  id: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalTypeDocuments = ({
  updateTypeDocumentsList,
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
    loadingTypeDocuments();
  }, [id]);

  useEffect(() => {
    loadingTypeDocuments();
  }, []);

  const loadingTypeDocuments = async () => {
    if (id) {
      await getTypeDocuments(`typeDocuments/${id}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            sigla: response.data.sigla,
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
    const editingType = form.getFieldsValue(true);
    if (id) {
      await updateTypeDocuments(editingType, id);
      updateTypeDocumentsList(editingType);
    }
  };

  const submitCreate = async () => {
    const editingType = form.getFieldsValue(true);
    await postTypeDocuments(editingType);
    updateTypeDocumentsList(editingType); // Chama a função updateAxleList com o novo axle
  };

  const clickDeleteType = async () => {
    const editingType = form.getFieldsValue(true);
    if (id) {
      await deleteTypeDocuments(id);
      closeModal(true);
      updateTypeDocumentsList(editingType);
    }
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Tipo de documento"
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
          <Col offset={1} span={8}>
            <Form.Item
              name="sigla"
              label="Sigla"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a sigla',
                },
              ]}
              hasFeedback
            >
              <Input />
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

export default ModalTypeDocuments;
