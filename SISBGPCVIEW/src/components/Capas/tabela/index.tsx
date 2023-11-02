import React from 'react';
import '../index.css';
import { Table } from 'antd';

require('./index.css');

export default function Tabela({ documents, unidadeBloco }: any) {
  const documentsWithPosition = documents.map((doc: any, index: number) => ({
    ...doc,
    position: index + 1,
  }));

  const columns = [
    {
      title: 'n°',
      dataIndex: 'position',
      key: 'position',
      width: '5%',
      render: (position: number) => <span>{position}</span>,
    },
    {
      title: `${documents[0].camada?.sigla}`,
      dataIndex: 'name',
      key: 'name',
      width: '35%',
    },
    {
      title: 'Tipo',
      dataIndex: 'typeDocuments',
      key: 'typeDocuments',
      width: '5%',
      render: (typeDocuments: { sigla: any }) =>
        typeDocuments ? typeDocuments.sigla : null,
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      width: '5%',
    },
    {
      title: 'Assunto',
      dataIndex: 'assunto',
      key: 'assunto',
      width: '40%',
    },
  ];

  return (
    <>
      <div className="table-container">
        <h2 className="unidade">{unidadeBloco}</h2>
        <Table
          columns={columns}
          dataSource={documentsWithPosition} // Use the updated documentsWithPosition array
          pagination={false}
          className="custom-table"
          style={{ pageBreakInside: 'auto' }}
        />
      </div>
    </>
  );
}
