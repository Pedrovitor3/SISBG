import {
  Avatar,
  Button,
  Dropdown,
  List,
  Popconfirm,
  Space,
  message,
} from 'antd';
import {
  deleteBoletim,
  getBoletim,
} from '../../hooks/services/axios/boletimService';
import { useState, useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import ModalBoletim from '../../components/Modal/ModalBoletim';

require('../index.css');

interface BoletimData {
  id: any;
  name: any;
  description: any;
  data: any;
}

type Props = {
  setChave: (id: string) => void;
  onBoletimIdChange: (id: string) => void;
};

export default function Board({ setChave, onBoletimIdChange }: Props) {
  const [boletim, setBoletim] = useState<BoletimData[]>([]);
  const [showBoletimModal, setShowBoletimModal] = useState(false);
  const [recordBoletim, setRecordBoletim] = useState<any>({});

  useEffect(() => {
    setShowBoletimModal(false);
    loadingBoletim();
  }, []);

  const updateBoletimList = (boletim: any) => {
    setBoletim(prevBoletim => [...prevBoletim, boletim]);
    loadingBoletim();
  };

  const loadingBoletim = async () => {
    try {
      const response = await getBoletim(`boletim`);
      if (response !== false) {
        setBoletim(response.data); // Assumindo que response.data seja um array de objetos
      } else {
        message.error('Ocorreu um erro inesperado ao obter os boletins.');
      }
    } catch (error) {
      message.error('Ocorreu um erro inesperado ao obter os boletins.');
    }
  };

  const handleBoletimClick = (boletimId: string) => {
    setChave('5');
    onBoletimIdChange(boletimId);
  };

  const handleMenuClick = (e: any) => {
    if (e.key === '1') {
      setShowBoletimModal(true);
    }
  };

  const clickDeleteBoletim = async (record: BoletimData) => {
    await deleteBoletim(record.id);
    const newBoletim = boletim.filter(boletim => boletim.id !== record.id);
    setBoletim(newBoletim);
  };

  const hideModal = (refresh: boolean) => {
    setShowBoletimModal(false);
    setRecordBoletim(null);
    if (refresh) setBoletim([]);
  };

  const renderMenu = (record: BoletimData) => {
    return (
      <Space size="middle">
        <Dropdown
          menu={{
            items: [
              {
                label: 'Alterar',
                key: '1',
                onClick: () => {
                  setRecordBoletim(record);
                },
              },
              {
                label: (
                  <Popconfirm
                    title="Tem certeza de que deseja desabilitar este boletim?"
                    onConfirm={() => clickDeleteBoletim(record)}
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
          setShowBoletimModal(true);
        }}
      >
        Criar Boletim Geral
      </Button>
      <List
        className="lista"
        itemLayout="horizontal"
        dataSource={boletim}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              className="item-lista"
              avatar={<Avatar src={require('../../assets/devPvsimple.jpeg')} />} // Substitua item.avatarUrl pelo campo correto dos seus dados
              title={
                <div>
                  <Button
                    type="primary"
                    className="button-list"
                    onClick={() => {
                      setChave('5');
                      handleBoletimClick(item.id);
                    }}
                  >
                    {item.name}
                  </Button>
                  <span className="icon-wrapper">{renderMenu(item)}</span>
                </div>
              }
              description={item.description} // Substitua item.description pelo campo correto dos seus dados
            />
          </List.Item>
        )}
      />
      <ModalBoletim
        updateBoletimList={updateBoletimList}
        id={recordBoletim?.id}
        closeModal={hideModal}
        openModal={showBoletimModal}
      />
    </>
  );
}
