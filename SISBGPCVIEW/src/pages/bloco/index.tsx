import {
  Avatar,
  Button,
  Dropdown,
  List,
  Popconfirm,
  Space,
  message,
} from 'antd';
import { useState, useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import ModalBloco from '../../components/Modal/ModalBloco';
import { deleteBloco, getBloco } from '../../hooks/services/axios/blocoService';
import { getDocuments } from '../../hooks/services/axios/documentsService';
import ModalArquivo from '../../components/Modal/ModalArquivo';
require('../index.css');

interface DataType {
  key: React.Key;
  id: any;
  name: any;
  boletim: any;
  position: any;
}

interface DocType {
  key: React.Key;
  id: any;
  name: any;
  bloco: any;
  description: any;
}

type DataIndex = keyof DataType;

type Props = {
  setChave: (id: string) => void;
  boletimId: string;
  onBlocoIdChange: (id: string) => void;
};

export default function Bloco({ boletimId, setChave, onBlocoIdChange }: Props) {
  const [bloco, setBloco] = useState<DataType[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  const [finalArquivo, setFinalArquivo] = useState<any>({});

  const [recordBloco, setRecordBloco] = useState<any>({});

  const [showBlocoModal, setShowBlocoModal] = useState(false);
  const [showArquivoModal, setShowArquivoModal] = useState(false);

  useEffect(() => {
    setShowBlocoModal(false);
    setShowArquivoModal(false);

    loadingData();
  }, []);

  const updateBlocoList = (bloco: any) => {
    setBloco(prevBloco => [...prevBloco, bloco]);

    loadingData();
  };

  const loadingData = async () => {
    try {
      const blocoResponse = await getBloco('bloco');
      if (blocoResponse !== false) {
        const filteredBlocos = blocoResponse.data.filter((bloco: any) => {
          return bloco.boletim && bloco.boletim.id === boletimId;
        });

        const sortedBlocos = filteredBlocos.sort((a: any, b: any) => {
          return parseInt(a.position, 10) - parseInt(b.position, 10);
        });

        setBloco(sortedBlocos);

        const documentResponse = await getDocuments('documents');
        if (documentResponse !== false) {
          const filteredDocumentos = documentResponse.data.filter(
            (documento: { bloco: { id: any; boletim: { id: string } } }) => {
              return (
                documento.bloco &&
                sortedBlocos.some(
                  (bloco: any) => bloco.id === documento.bloco.id,
                ) &&
                documento.bloco.boletim.id === boletimId
              );
            },
          );

          // Ordenar os documentos por 'position'
          const sortedDocumentos = filteredDocumentos.sort((a: any, b: any) => {
            return parseInt(a.position, 10) - parseInt(b.position, 10);
          });

          setDocuments(sortedDocumentos);
        } else {
          message.error('Ocorreu um erro inesperado ao obter os documentos.');
        }
      } else {
        message.error('Ocorreu um erro inesperado ao obter os blocos.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter os dados.');
    }
  };

  const hideModal = (refresh: boolean) => {
    setShowBlocoModal(false);
    setShowArquivoModal(false);
    setFinalArquivo(null);
    setRecordBloco(null);
    if (refresh) setBloco([]);
  };

  const handleBoletimClick = () => {
    setChave('4');
  };

  const handleBlocoClick = (blocoId: string) => {
    setChave('6');
    onBlocoIdChange(blocoId);
  };

  const handleMenuClick = (e: any) => {
    if (e.key === '1') {
      setShowBlocoModal(true);
    }
  };

  const clickDeleteBloco = async (record: DataType) => {
    try {
      await deleteBloco(record.id);
      const newDocuments = bloco.filter(bloco => bloco.id !== record.id);
      setBloco(newDocuments);
    } catch (error) {
      message.error('Ocorreu um erro ao excluir o bloco.');
    }
  };

  const renderMenu = (record: DataType) => {
    return (
      <Space size="middle">
        <Dropdown
          menu={{
            items: [
              {
                label: 'Alterar',
                key: '1',
                onClick: () => {
                  setRecordBloco(record);
                },
              },
              {
                label: (
                  <Popconfirm
                    title="Tem certeza de que deseja desabilitar este registro de bloco?"
                    onConfirm={() => clickDeleteBloco(record)}
                  >
                    Excluir
                  </Popconfirm>
                ),
                key: '2',
                danger: true,
              },
            ],
            onClick: handleMenuClick,
          }}
        >
          <a onClick={e => e.preventDefault()} className="option">
            <Space>
              <MoreOutlined />
            </Space>
          </a>
        </Dropdown>
      </Space>
    );
  };

  return (
    <>
      <Button
        className="button-criar"
        type="primary"
        onClick={() => {
          setChave('4');
          handleBoletimClick();
        }}
      >
        Voltar
      </Button>
      <Button
        className="button-criar"
        type="primary"
        onClick={() => {
          setShowBlocoModal(true);
        }}
      >
        Criar novo bloco
      </Button>
      <Button
        className="button-criar"
        type="primary"
        onClick={() => {
          loadingData();
          setShowArquivoModal(true);
        }}
      >
        Gerar documento
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={bloco}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              className="item-lista"
              avatar={<Avatar src={require('../../assets/devPvsimple.jpeg')} />}
              title={
                <>
                  <div>
                    <Button
                      type="primary"
                      className="button-list"
                      onClick={() => {
                        setChave('6');
                        handleBlocoClick(item.id);
                      }}
                    >
                      {item.name}
                    </Button>
                    <span className="icon-wrapper">{renderMenu(item)}</span>
                  </div>
                </>
              }
            />
          </List.Item>
        )}
      />
      <ModalBloco
        id={recordBloco?.id}
        boletimId={boletimId}
        openModal={showBlocoModal}
        closeModal={hideModal}
        updateBlocoList={updateBlocoList}
      />
      <ModalArquivo
        openModal={showArquivoModal}
        closeModal={hideModal}
        finalArquivo={finalArquivo}
        boletimId={boletimId}
        blocos={bloco}
        documents={documents}
      />
    </>
  );
}
