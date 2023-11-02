import {
  Modal,
  Form,
  Input,
  Col,
  message,
  Select,
  Row,
  Button,
  Upload,
  Popconfirm,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  getDocuments,
  postDocuments,
  updateDocuments,
} from '../../../hooks/services/axios/documentsService';
import { getTypeDocuments } from '../../../hooks/services/axios/typeDocumentsService';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import ReactInputMask from 'react-input-mask';
import moment from 'moment';
import { getClassificacao } from '../../../hooks/services/axios/classificacaoService';
import { getCamada } from '../../../hooks/services/axios/camadaService';
import ModalTypeDocuments from '../ModalTypeDocuments';
import ModalClassificacao from '../ModalClassificacao';
import ModalCamada from '../ModalCamada';
import { pdfjs } from 'react-pdf';
import {
  deleteArquivo,
  postArquivo,
} from '../../../hooks/services/axios/arquivoService';

require('../index.css');

type Props = {
  updateDocumentsList: any;
  id: string;
  openModal: boolean;
  blocoId: string;
  closeModal: (refresh: boolean) => void;
};

const ModalDocuments = ({
  updateDocumentsList,
  id,
  blocoId,
  closeModal,
  openModal,
}: Props) => {
  const [form] = Form.useForm();

  const [docs, setDocs] = useState<any[]>([]);
  const [typesDocuments, setTypesDocuments] = useState<any[]>([]);
  const [classificacao, setClassificacao] = useState<any[]>([]);
  const [camada, setCamada] = useState<any[]>([]);

  const [selectTypeDocumentsId, setSelectedTypeDocumentsId] = useState('');
  const [selectClassificacaoId, setSelectedClassificacaoId] = useState('');
  const [selectCamadaId, setSelectedCamadaId] = useState('');

  const [base64, setBase64] = useState<any>([]);

  const [showTypeDocumentsModal, setShowTypeDocumentsModal] = useState(false);
  const [showClassificacaoModal, setShowClassificacaoModal] = useState(false);
  const [showCamadaModal, setShowCamadaModal] = useState(false);

  const [hasArquivo, setHasArquivo] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  useEffect(() => {
    if (openModal) {
      loadingAllDocuments();
      setShowTypeDocumentsModal(false);
      setShowCamadaModal(false);
      setShowClassificacaoModal(false);
    }
    setHasArquivo(false);
  }, [openModal]);

  const hideModal = (refresh: boolean) => {
    setShowTypeDocumentsModal(false);
    setShowClassificacaoModal(false);
    setShowCamadaModal(false);
    if (refresh) {
      loadingAllDocuments();
      setHasArquivo(false);
    }
  };

  useEffect(() => {
    if (id && openModal) {
      loadingDocuments();
      setHasArquivo(false);
    }
  }, [openModal, id]);

  const loadingTypeDocuments = async () => {
    try {
      const response = await getTypeDocuments('typeDocuments');
      if (response !== false) {
        setTypesDocuments(response.data);
      } else {
        message.error('Ocorreu um erro inesperado ao obter as etapas.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter as etapas.');
    }
  };

  const loadingClassificacao = async () => {
    try {
      const response = await getClassificacao('classificacao');
      if (response !== false) {
        setClassificacao(response.data);
      } else {
        message.error('Ocorreu um erro inesperado ao obter as classificações.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter as classificações.');
    }
  };

  const loadingCamada = async () => {
    try {
      const response = await getCamada('camada');
      if (response !== false) {
        setCamada(response.data);
      } else {
        message.error('Ocorreu um erro inesperado ao obter as camadas.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter as camadas.');
    }
  };

  const loadingAllDocuments = async () => {
    try {
      const response = await getDocuments(`documents`);

      if (response !== false) {
        const filteredStages = response.data.filter((documents: any) => {
          return documents.bloco && documents.bloco.id === blocoId;
        });
        setDocs(filteredStages);
        loadingCamada();
        loadingClassificacao();
        loadingTypeDocuments();
      } else {
        message.error('Ocorreu um erro inesperado ao obter os documentos.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter os documentos.');
    }
  };

  const loadingDocuments = async () => {
    if (id) {
      try {
        const response = await getDocuments(`documents/${id}`);
        if (response !== false) {
          if (response.data.arquivos.length !== 0) {
            setHasArquivo(true);
          }
          console.log(response.data);
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            assunto: response.data.assunto,
            position: response.data.position,
            data: response.data.data,
            bloco: response.data?.bloco ? response.data.bloco.id : null,
            arquivos: response.data?.arquivos
              ? response.data?.arquivos.id
              : null,
            typeDocuments: response.data?.typeDocuments
              ? response.data?.typeDocuments.id
              : null,
            classificacao: response.data?.classificacao
              ? response.data?.classificacao.id
              : null,
            camada: response.data?.camada ? response.data?.camada.id : null,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter o documento.');
        }
      } catch (error) {
        message.error('Ocorreu um erro inesperado ao obter o documento.');
      }
    }
  };

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
            docs.length > 0
              ? Math.max(...docs.map((doc: any) => doc.position))
              : 0;
          const newPosition = maxPosition + 1;
          formData.position = newPosition;
          submitCreate();
        }
        form.resetFields();
        closeModal(true);
      })
      .catch(errorInfo => message.error('Error filling out the fields.'));
  };

  const submitUpdate = async () => {
    const editingDocuments = form.getFieldsValue(true);
    await updateDocuments(editingDocuments, id);
    sendArquivos(id);

    updateDocumentsList(editingDocuments);
  };

  const submitCreate = async () => {
    const editingDocuments = form.getFieldsValue(true);
    const res = await postDocuments(editingDocuments);

    sendArquivos(res?.data.id);
    updateDocumentsList(editingDocuments);
    setDocs(prevDocs => [...prevDocs, editingDocuments]);
  };

  function handleSelectTypeDocuments(value: any) {
    setSelectedTypeDocumentsId(value);
  }

  function handleSelectClassificacao(value: any) {
    setSelectedClassificacaoId(value);
  }
  function handleSelectCamada(value: any) {
    setSelectedCamadaId(value);
  }

  const convertPdfToBase64 = async (pdfData: File) => {
    if (pdfData.type !== 'application/pdf') {
      message.error('Formato do arquivo inválido, por favor envie um PDF');
      return; // Sai do bloco try imediatamente
    }
    try {
      setIsUploading(true);

      // Ler o conteúdo do arquivo PDF como um array de bytes
      const arrayBuffer = await readFileAsArrayBuffer(pdfData);

      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      console.log('PDF loaded');

      const numPages = pdf.numPages;
      const base64Images = [];

      for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const scale = 1.5;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Failed to create 2D context for canvas');
        }

        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
          background: 'white',
        }).promise;

        const base64Image = canvas.toDataURL('image/jpeg');
        base64Images.push(base64Image);
      }
      setBase64(base64Images);
      setHasArquivo(true);
      setIsUploading(false);
    } catch {
      message.error('Ocorreu um erro ao receber o arquivo');
    }
  };

  const sendArquivos = async (id: any) => {
    const res = await getDocuments(`documents/${id}`);
    if (res) {
      const arquivos = res.data.arquivos;
      if (arquivos.length === 0 && hasArquivo) {
        for (let i = 0; base64.length > i; i++) {
          const infoDoc = {
            base64: base64[i],
            documents: id,
          };
          await postArquivo(infoDoc);
        }
      }
    }
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target && event.target.result) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          resolve(arrayBuffer);
        } else {
          reject(new Error('Failed to read file as array buffer'));
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const isDateValid = (value: any) => {
    return moment(value, 'DD/MM/YYYY', true).isValid();
  };

  const handleDeleteFile = async () => {
    try {
      if (id) {
        const res = await getDocuments(`documents/${id}`);
        if (res) {
          const arquivos = res.data.arquivos;
          if (arquivos) {
            for (let i = 0; arquivos.length > i; i++) {
              await deleteArquivo(arquivos[i].id);
            }
          }
        }
      }

      setHasArquivo(false);
    } catch (error) {
      message.error('Ocorreu um erro ao excluir o documento.');
    }
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Documento"
        okText="Salvar"
        width={700}
        onCancel={() => {
          form.resetFields();
          closeModal(false);
        }}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={15} style={{ height: '120px' }}>
            <Col offset={1} span={12}>
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
            <Col offset={1} span={9}>
              <Form.Item
                name={['data']}
                label="Data do Documento"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || isDateValid(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'Por favor, insira uma data válida ',
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <ReactInputMask
                  className="input-mask-date"
                  placeholder="00/00/0000"
                  maskChar={null}
                  mask="99/99/9999"
                />
              </Form.Item>
            </Col>
            {/*
            <Col offset={1} span={9}>
              <Form.Item name="position" label="Posição">
                <Input type="number" />
              </Form.Item>
              </Col>*/}
          </Row>
          <Row gutter={5} style={{ height: '120px' }}>
            <Col offset={1} span={12}>
              <Form.Item
                name="assunto"
                label="Assunto"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o assunto',
                  },
                ]}
                hasFeedback
              >
                <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} />
              </Form.Item>
            </Col>

            <Col offset={1} span={8}>
              <Form.Item
                name={['typeDocuments']}
                label="Tipo de documento"
                rules={[]}
                hasFeedback
              >
                <Select
                  showSearch
                  placeholder={'Selecione o tipo do documento'}
                  onChange={value => handleSelectTypeDocuments(value)}
                  value={selectTypeDocumentsId}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { label: 'Nenhum', value: null }, // Opção vazia
                    ...typesDocuments.map(type => ({
                      label: type.name,
                      value: type.id,
                    })),
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col offset={0} span={1}>
              <Button
                style={{
                  marginTop: '29px',
                  marginLeft: '0px',
                  marginRight: '12px',
                  width: '4%',
                }}
                className="button-modal"
                onClick={() => {
                  setShowTypeDocumentsModal(true);
                }}
              >
                <div className="icone">
                  <PlusOutlined />
                </div>
              </Button>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col offset={1} span={10}>
              <Form.Item
                name={['classificacao']}
                label="Classificação"
                rules={[]}
                hasFeedback
              >
                <Select
                  style={{ width: '300px' }}
                  showSearch
                  placeholder={'Selecione a Classificação'}
                  onChange={value => handleSelectClassificacao(value)}
                  value={selectClassificacaoId}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { label: 'Nenhum', value: null }, // Opção vazia
                    ...classificacao.map(classificacao => ({
                      label: classificacao.name,
                      value: classificacao.id,
                    })),
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col offset={0} span={1}>
              <Form.Item>
                <Button
                  style={{
                    marginTop: '29px',
                    marginLeft: '20px',
                    marginRight: '12px',
                    width: '4%',
                  }}
                  className="button-modal"
                  onClick={() => {
                    setShowClassificacaoModal(true);
                  }}
                >
                  <div className="icone">
                    <PlusOutlined />
                  </div>
                </Button>
              </Form.Item>
            </Col>

            <Col offset={2} span={8}>
              <Form.Item
                name={['camada']}
                label="Camada"
                rules={[]}
                hasFeedback
              >
                <Select
                  showSearch
                  placeholder={'Selecione a camada'}
                  onChange={value => handleSelectCamada(value)}
                  value={selectCamadaId}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { label: 'Nenhum', value: null }, // Opção vazia
                    ...camada.map(camada => ({
                      label: camada.name,
                      value: camada.id,
                    })),
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col offset={0} span={1}>
              <Button
                style={{
                  marginTop: '29px',
                  marginLeft: '0px',
                  marginRight: '12px',
                  width: '4%',
                }}
                className="button-modal"
                onClick={() => {
                  setShowCamadaModal(true);
                }}
              >
                <div className="icone">
                  <PlusOutlined />
                </div>
              </Button>
            </Col>
          </Row>
          <Col offset={1}>
            <Form.Item name="arquivos" label="Arquivo" valuePropName="file">
              <Upload
                name="file"
                action="/upload"
                beforeUpload={file => {
                  convertPdfToBase64(file);
                  return false;
                }}
                maxCount={1}
                disabled={hasArquivo !== false}
                showUploadList={false} // Adicione esta linha
              >
                <Button
                  icon={
                    isUploading ? (
                      <LoadingOutlined />
                    ) : hasArquivo ? (
                      <CheckCircleOutlined />
                    ) : (
                      <UploadOutlined />
                    )
                  }
                  disabled={hasArquivo !== false || isUploading}
                >
                  {isUploading
                    ? 'Enviando...'
                    : hasArquivo
                    ? 'Arquivo Anexado'
                    : 'Anexar Arquivo'}
                </Button>
              </Upload>
              {hasArquivo && (
                <Popconfirm
                  title="Tem certeza que deseja apagar o arquivo?"
                  onConfirm={() => {
                    handleDeleteFile();
                  }}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button icon={<DeleteOutlined />} type="link">
                    Apagar Arquivo
                  </Button>
                </Popconfirm>
              )}
            </Form.Item>
            <Form.Item name="bloco" initialValue={blocoId} className="hidden" />
          </Col>
        </Form>
      </Modal>

      <ModalTypeDocuments
        id={''}
        openModal={showTypeDocumentsModal}
        closeModal={hideModal}
        updateTypeDocumentsList={loadingDocuments}
      />
      <ModalClassificacao
        openModal={showClassificacaoModal}
        closeModal={hideModal}
        updateClassificacaoList={loadingDocuments}
        id={''}
      />
      <ModalCamada
        openModal={showCamadaModal}
        closeModal={hideModal}
        updateCamadaList={loadingDocuments}
        id={''}
      />
    </>
  );
};

export default ModalDocuments;
