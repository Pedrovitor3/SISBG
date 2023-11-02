import { Modal, Spin } from 'antd';
import Header from '../../Capas/header';
import { useEffect, useState } from 'react';
import Tabela from '../../Capas/tabela';
import html2pdf from 'html2pdf.js';
import { pdfjs } from 'react-pdf';
import Cabecalho from '../../Capas/cabecalho';
import { getBoletim } from '../../../hooks/services/axios/boletimService';

require('./index.css');

type Props = {
  openModal: boolean;
  finalArquivo: any;
  documents: any;
  blocos: any;
  boletimId: any;
  closeModal: (refresh: boolean) => void;
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ModalArquivo = ({
  closeModal,
  openModal,
  documents,
  blocos,
  boletimId,
}: Props) => {
  const [classificacoes, setClassificacoes] = useState<any[]>([]);
  const [camada, setCamada] = useState<any[]>([]);
  const [boletim, setBoletim] = useState<any>();

  const [url, setUrl] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // Para controlar o estado de carregamento

  let indice = 4;

  const handleOk = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (openModal) {
      infoBloco();
    }
  }, [openModal]);

  useEffect(() => {
    if (openModal) {
      infoBloco();
    }
  }, [documents]);

  const infoBloco = async () => {
    const response = await getBoletim(`boletim/${boletimId}`);
    if (response !== false) {
      setBoletim(response.data);
    }
    const uniqueClassificacoes = new Set<string>(); // Use Set to track unique classificacoes
    documents.forEach((doc: { classificacao: { name: string } }) => {
      if (doc.classificacao && doc.classificacao.name) {
        uniqueClassificacoes.add(doc.classificacao.name);
      }
    });

    const uniqueCamada = new Set<string>(); // Use Set to track unique classificacoes
    documents.forEach((doc: { camada: { name: string } }) => {
      if (doc.camada && doc.camada.name) {
        uniqueCamada.add(doc.camada.name);
      }
    });
    setClassificacoes(Array.from(uniqueClassificacoes));
    setCamada(Array.from(uniqueCamada));

    await convertToPDF();
  };

  const convertToPDF = async () => {
    const element = document.getElementById('capa');

    if (element) {
      element.style.display = 'block'; //componente aparece na tela
      setIsLoading(true);

      const options = {
        margin: 10,
        filename: 'cabecalho.pdf',
        image: { type: 'jpeg', quality: 0.98 } as const,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } as const,
      };

      try {
        const pdfBlob = await html2pdf()
          .from(element)
          .set(options)
          .output('blob');

        const pdfUrl = URL.createObjectURL(pdfBlob);

        setUrl(pdfUrl);
        element.style.display = 'none'; //componente retirado da tela
        setIsLoading(false); // Oculta o indicador de carregamento
      } catch (error) {
        console.error('Erro ao converter para PDF:', error);
        setIsLoading(false);
      }
    } else {
      console.error('Element with ID "capa" not found.');
    }
  };

  return (
    <Modal
      visible={openModal}
      title="Boletim Geral"
      okText="Salvar"
      onCancel={() => {
        closeModal(false);
      }}
      onOk={handleOk}
      centered={true}
      footer={null}
      width="900px"
    >
      {isLoading && (
        // Mostra o indicador de carregamento enquanto o PDF está sendo gerado
        <div className="loading-indicator">
          <Spin />
        </div>
      )}
      <div id="capa">
        <Cabecalho numero={boletim?.numero} data={boletim?.data} indice={1} />

        {Array.isArray(blocos) ? (
          blocos.map((blocoItem, index) => {
            let counterClassificacao = 0;

            return (
              <div key={`capa-${index}`} className="page">
                <div className="header">
                  <Header
                    numero={boletim?.numero}
                    data={boletim?.data}
                    indice={indice++}
                  />
                </div>

                <div className="bloco-titulo">
                  {index === 0 && (
                    <div className="bloco-titulo">
                      <p>
                        Para conhecimento desta Instituição e devida execução
                        publique-se o seguinte:
                      </p>
                    </div>
                  )}
                </div>
                <div className="container-part">
                  <h2>
                    {blocoItem.position} - {blocoItem.name}
                  </h2>

                  {documents
                    .filter(
                      (documents: any) => documents.bloco.id === blocoItem.id,
                    )
                    .map((doc: any, filteredIndex: any) => {
                      return <div key={`classificacao-${filteredIndex}`}></div>;
                    })}
                  {classificacoes
                    .filter(classificacaoItem => {
                      return documents.some(
                        (doc: any) =>
                          doc.classificacao?.name === classificacaoItem &&
                          doc.bloco.id === blocoItem.id,
                      );
                    })
                    .map((classificacaoItem, classificacaoIndex) => {
                      let counterCamada = 0;
                      return (
                        <div key={`classificacao-${classificacaoIndex}`}>
                          <h3 className="classificacao">
                            {blocoItem.position}.{++counterClassificacao} -{' '}
                            {classificacaoItem}
                          </h3>
                          {camada
                            .filter(camadaItem => {
                              return documents.some(
                                (doc: any) =>
                                  doc.classificacao?.name ===
                                    classificacaoItem &&
                                  doc.camada?.name === camadaItem &&
                                  doc.bloco.id === blocoItem.id,
                              );
                            })
                            .map((filteredCamadaItem, camadaIndex) => (
                              <div key={`camada-${camadaIndex}`}>
                                <p className="camada">
                                  {blocoItem.position}.{counterClassificacao}.
                                  {++counterCamada}-{filteredCamadaItem}
                                </p>
                                {documents.some(
                                  (doc: any) =>
                                    doc.typeDocuments &&
                                    doc.classificacao?.name ===
                                      classificacaoItem &&
                                    doc.camada?.name === filteredCamadaItem &&
                                    doc.bloco.id === blocoItem.id,
                                ) ? (
                                  <div className="tabela">
                                    <Tabela
                                      documents={documents.filter(
                                        (doc: any) =>
                                          doc.classificacao?.name ===
                                            classificacaoItem &&
                                          doc.camada?.name ===
                                            filteredCamadaItem &&
                                          doc.bloco.id === blocoItem.id,
                                      )}
                                      unidadeBloco={blocoItem.unidade}
                                    />
                                  </div>
                                ) : (
                                  <p className="sem-alteracao">
                                    - Sem alteração.
                                  </p>
                                )}
                                {documents.some(
                                  (doc: any) =>
                                    doc.typeDocuments &&
                                    doc.classificacao?.name ===
                                      classificacaoItem &&
                                    doc.camada?.name === filteredCamadaItem &&
                                    doc.bloco.id === blocoItem.id,
                                ) && (
                                  <div className="pdfs">
                                    {documents.map((doc: any) => {
                                      if (
                                        doc.classificacao?.name ===
                                          classificacaoItem &&
                                        doc.camada?.name ===
                                          filteredCamadaItem &&
                                        doc.bloco.id === blocoItem.id &&
                                        doc.arquivos
                                      ) {
                                        return (
                                          <div key={doc.id}>
                                            {doc.arquivos.map(
                                              (arquivoItem: any) => (
                                                <div key={arquivoItem.id}>
                                                  <img
                                                    src={arquivoItem.base64}
                                                    alt="PDF Preview"
                                                    style={{
                                                      maxWidth: '700px',
                                                      width: '100%',
                                                      height: 'auto',
                                                      pageBreakInside: 'avoid',
                                                    }}
                                                  />
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                )}
                              </div>
                            ))}
                          {documents.some(
                            (doc: any) =>
                              doc.typeDocuments &&
                              doc.classificacao?.name === classificacaoItem &&
                              doc.camada === null &&
                              doc.bloco.id === blocoItem.id,
                          ) ? (
                            <Tabela
                              documents={documents.filter(
                                (doc: any) =>
                                  doc.typeDocuments &&
                                  doc.classificacao?.name ===
                                    classificacaoItem &&
                                  doc.camada === null &&
                                  doc.bloco.id === blocoItem.id,
                              )}
                              unidadeBloco={blocoItem.unidade}
                            />
                          ) : null}
                          {documents.some(
                            (doc: any) =>
                              doc.classificacao?.name === classificacaoItem &&
                              doc.camada === null &&
                              doc.bloco.id === blocoItem.id &&
                              doc.typeDocuments === null,
                          ) ? (
                            <p className="sem-alteracao">- Sem alteração.</p>
                          ) : null}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          <p>No blocos found.</p>
        )}
      </div>

      <iframe title="PDF Viewer" src={url} width="100%" height="600px" />
    </Modal>
  );
};

export default ModalArquivo;
