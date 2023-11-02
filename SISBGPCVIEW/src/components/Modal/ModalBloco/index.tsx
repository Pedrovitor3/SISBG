import { Modal, Form, Input, Col, message, Row } from 'antd';
import { useEffect, useState } from 'react';
import {
  getBloco,
  postBloco,
  updateBloco,
} from '../../../hooks/services/axios/blocoService';

require('../index.css');

type Props = {
  updateBlocoList: any;
  id: string;
  openModal: boolean;
  boletimId: string;
  closeModal: (refresh: boolean) => void;
};

const ModalBloco = ({
  updateBlocoList,
  id,
  closeModal,
  openModal,
  boletimId,
}: Props) => {
  const [form] = Form.useForm();
  const [blocos, setBlocos] = useState<any[]>([]);
  useEffect(() => {
    if (openModal) {
      loadingBloco();
      loadingAllBlocos();
    }
  }, [openModal]);

  const loadingBloco = async () => {
    if (id) {
      await getBloco(`bloco/${id}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            boletim: response.data.boletim,
            position: response.data.position,
            unidade: response.data.unidade,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter os documentos.');
        }
      });
    }
  };

  const submitUpdate = async () => {
    const editingBloco = form.getFieldsValue(true);
    await updateBloco(editingBloco, id);
    updateBlocoList(editingBloco);
  };

  const submitCreate = async () => {
    const editingBloco = form.getFieldsValue(true);
    await postBloco(editingBloco);
    updateBlocoList(editingBloco); // Chama a função updateAxleList com o novo axle
  };
  async function loadingAllBlocos() {
    try {
      const response = await getBloco(`bloco`);

      if (response !== false) {
        const filteredBlocos = response.data.filter((bloco: any) => {
          return bloco.boletim && bloco.boletim.id === boletimId;
        });

        setBlocos(filteredBlocos);
      } else {
        message.error('Ocorreu um erro inesperado ao obter os blocos.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter os blocos.');
    }
  }

  const handleOk = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(() => {
        const formData = form.getFieldsValue(true);
        if (id) {
          submitUpdate();
        } else {
          const maxPosition =
            blocos.length > 0
              ? Math.max(...blocos.map((bloco: any) => bloco.position))
              : 0;

          const newPosition = maxPosition + 1;
          formData.position = newPosition;
          submitCreate();
        }
        form.resetFields();
        closeModal(true);
      })
      .catch(errorInfo => message.error('Erro no preenchimento dos campos.'));
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Bloco"
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
              style={{ marginTop: '20px' }}
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
              style={{ marginTop: '20px' }}
              name="unidade"
              label="Unidade"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira a unidade',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </Col>

          <Col offset={1} span={6}>
            {/*      <Form.Item
              name="position"
              label="Posição"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione a posição do bloco',
                },
                {
                  validator: (_, value) => {
                    const intValue = parseInt(value, 10);
                    if (isNaN(intValue) || intValue < 1 || intValue > 8) {
                      return Promise.reject('Insira um número entre 1 e 8');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              hasFeedback
            >
              <Input
                type="number"
                min={1}
                max={8}
                onChange={e => {
                  const inputValue = e.target.value;
                  const intValue = parseInt(inputValue, 10);
                  if (!isNaN(intValue) && intValue >= 1 && intValue <= 8) {
                    form.setFieldsValue({ position: intValue });
                  }
                }}
              />
            </Form.Item>
              */}
            <Form.Item
              name="boletim"
              className="hidden"
              initialValue={boletimId}
            ></Form.Item>
          </Col>
        </Form>
      </Modal>
    </>
  );
};

export default ModalBloco;
