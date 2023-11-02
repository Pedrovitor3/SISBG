import React, { useEffect, useState } from 'react';
import { Button, List, Popconfirm, Tabs, message } from 'antd';
import {
  deleteClassificacao,
  getClassificacao,
} from '../../hooks/services/axios/classificacaoService';
import {
  deleteCamada,
  getCamada,
} from '../../hooks/services/axios/camadaService';
import {
  deleteTypeDocuments,
  getTypeDocuments,
} from '../../hooks/services/axios/typeDocumentsService';
import ModalTypeDocuments from '../../components/Modal/ModalTypeDocuments';
import ModalClassificacao from '../../components/Modal/ModalClassificacao';
import ModalCamada from '../../components/Modal/ModalCamada';
import { DeleteOutlined } from '@ant-design/icons';

export default function TiposDoc() {
  const [recordTypeDocuments, setRecordTypeDocuments] = useState<any>({});
  const [recordClassificacao, setRecordClassificacao] = useState<any>({});
  const [recordCamada, setRecordCamada] = useState<any>({});

  const [showTypeDocumentsModal, setShowTypeDocumentsModal] = useState(false);
  const [showClassificacaoModal, setShowClassificacaoModal] = useState(false);
  const [showCamadaModal, setShowCamadaModal] = useState(false);

  const [typesDocuments, setTypeDocuments] = useState<any[]>([]);
  const [classificacao, setClassificacao] = useState<any[]>([]);
  const [camada, setCamada] = useState<any[]>([]);

  useEffect(() => {
    loadingTypeDocuments();
    loadingClassificacao();
    loadingCamada();
  }, []);

  const hideModal = (refresh: boolean) => {
    setShowTypeDocumentsModal(false);
    setShowClassificacaoModal(false);
    setShowCamadaModal(false);
    setRecordTypeDocuments(null);
    setRecordClassificacao(null);
    setRecordCamada(null);
  };

  const reloadDocuments = () => {
    loadingClassificacao();
    loadingCamada();
    loadingTypeDocuments();
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

  const loadingTypeDocuments = async () => {
    try {
      const response = await getTypeDocuments('typeDocuments');
      if (response !== false) {
        setTypeDocuments(response.data);
      } else {
        message.error(
          'Ocorreu um erro inesperado ao obter os tipos de documentos.',
        );
      }
    } catch (error) {
      message.error(
        'Ocorreu um erro inesperado ao obter os tipos de documentos.',
      );
    }
  };

  const clickDelete = async (record: any, type: string) => {
    try {
      if (type === '1') {
        await deleteTypeDocuments(record.id);
        loadingTypeDocuments();
      } else if (type === '2') {
        await deleteClassificacao(record.id);
        loadingClassificacao();
      } else if (type === '3') {
        await deleteCamada(record.id);
        loadingCamada();
      }
    } catch (error) {
      message.error('Ocorreu um erro ao excluir o documento.');
    }
  };

  const renderMenu = (record: any, type: string) => (
    <Popconfirm
      title="Tem certeza de que deseja excluir este registro?"
      onConfirm={() => clickDelete(record, type)}
      okText="Sim"
      cancelText="Não"
    >
      <DeleteOutlined />
    </Popconfirm>
  );

  return (
    <>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane key="1" tab="Tipo de Documentos">
          <Button
            className="button-tab"
            type="primary"
            onClick={() => {
              setShowTypeDocumentsModal(true);
            }}
          >
            Criar tipo de documento
          </Button>

          <List
            itemLayout="horizontal"
            dataSource={typesDocuments}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  className="item-lista"
                  title={
                    <div className="button-container">
                      <Button
                        type="primary"
                        className="button-list"
                        onClick={() => {
                          setShowTypeDocumentsModal(true);
                          setRecordTypeDocuments(item);
                        }}
                      >
                        {item.name}
                      </Button>
                      <span className="icon-wrapper">
                        {renderMenu(item, '1')}
                      </span>
                    </div>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Classificações">
          <Button
            className="button-tab"
            type="primary"
            onClick={() => {
              setShowClassificacaoModal(true);
            }}
          >
            Criar Classificação
          </Button>

          <List
            itemLayout="horizontal"
            dataSource={classificacao}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  className="item-lista"
                  title={
                    <>
                      <div className="button-container">
                        <Button
                          type="primary"
                          className="button-list"
                          onClick={() => {
                            setShowClassificacaoModal(true);
                            setRecordClassificacao(item);
                          }}
                        >
                          {item.name}
                        </Button>
                        <span className="icon-wrapper">
                          {renderMenu(item, '2')}
                        </span>
                      </div>
                    </>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Camadas">
          <Button
            className="button-tab"
            type="primary"
            onClick={() => {
              setShowCamadaModal(true);
            }}
          >
            Criar Camada
          </Button>
          <List
            itemLayout="horizontal"
            dataSource={camada}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  className="item-lista"
                  title={
                    <>
                      <div className="button-container">
                        <Button
                          type="primary"
                          className="button-list"
                          onClick={() => {
                            setShowCamadaModal(true);
                            setRecordCamada(item);
                          }}
                        >
                          {item.name}
                        </Button>
                        <span className="icon-wrapper">
                          {renderMenu(item, '3')}
                        </span>
                      </div>
                    </>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Tabs.TabPane>
      </Tabs>
      <ModalTypeDocuments
        id={recordTypeDocuments?.id}
        openModal={showTypeDocumentsModal}
        closeModal={hideModal}
        updateTypeDocumentsList={reloadDocuments}
      />
      <ModalClassificacao
        id={recordClassificacao?.id}
        openModal={showClassificacaoModal}
        closeModal={hideModal}
        updateClassificacaoList={reloadDocuments}
      />
      <ModalCamada
        id={recordCamada?.id}
        openModal={showCamadaModal}
        closeModal={hideModal}
        updateCamadaList={reloadDocuments}
      />
    </>
  );
}
