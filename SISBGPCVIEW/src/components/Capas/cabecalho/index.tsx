require('./index.css');

import { PhoneFilled } from '@ant-design/icons';
import livrosBoletimImg from '../../../assets/livros-2.jpeg';
import logo from '../../../assets/devPvBlackd.jpeg';
import adm from '../../../assets/adm.png';
import Sumario from '../sumario';

import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from '../header';

type Props = {
  numero: any;
  data: any;
  indice: any;
};

export default function Cabecalho({ numero, data, indice }: Props) {
  // Parse the date string to a Date object
  const dateObj = parse(data, 'dd/MM/yyyy', new Date());

  // Check if the parsed date is valid
  const isValidDate = !isNaN(dateObj.getTime());

  // Format the date to be displayed as Brazilian format or display an error message
  const formattedDate = isValidDate
    ? format(dateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : 'Invalid Date';

  return (
    <>
      <div id="pdf-container">
        <div className="container-pai">
          <Header numero={numero} data={data} indice={indice} />
          <div className="container">
            <div className="logo-bg">
              <img src={logo} alt="logo-bg" />
            </div>
            <div>
              <ul className="lista-bg">
                <li>
                  <p>
                    <PhoneFilled
                      style={{ fontSize: '19px', marginRight: '10px' }}
                    />
                    62
                    <b style={{ fontSize: '20px', fontWeight: '800' }}>
                      3201 2546
                    </b>
                  </p>
                </li>
                <li>
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,300,1,0"
                  />
                  <span className="material-symbols-outlined">
                    captive_portal
                  </span>
                  <p>
                    www.<b style={{ fontSize: '16px' }}>policiacivil</b>
                    .go.gov.br
                  </p>
                </li>

                <li>
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,1,0"
                  />
                  <span className="material-symbols-outlined">lan</span>
                  <p>
                    <b style={{ fontSize: '16px' }}> intranet</b>.ssp-go.net
                  </p>
                </li>
                <li>
                  <span className="material-symbols-outlined">location_on</span>
                  <p>
                    Av Anhanguera 7364 <br />
                    Setor Aeroviário 74 535 010
                    <br /> Goiânia Goiás Brasil
                  </p>
                </li>
              </ul>
            </div>

            <div className="info-bg">
              <p>
                Goiânia,
                <span> </span>
                {isValidDate ? formattedDate : 'Invalid Date'}
              </p>
              <p className="bg">BOLETIM-GERAL</p>
              <p>
                <b style={{ fontWeight: '800' }}>{numero} </b>
              </p>
            </div>

            <div className="titulo">
              <span>ELETRÔNICO</span>
              <p>BOLETIM-GERAL</p>
            </div>
          </div>
          <body>
            <div>
              <img
                className="book-image"
                src={livrosBoletimImg}
                alt="Descrição da imagem"
              />
            </div>

            <div className="container-footer">
              <div>
                <img className="img-adm" src={adm} alt="a-adm" />
              </div>
              <div className="bloco">
                <p>
                  Delegado-geral <br />
                  <p className="nomes">ANDRÉ AUGUSTO CORTEZE GANGA</p>
                </p>
                <p>
                  Delegado-geral Adjunto
                  <br />
                  <p className="nomes"> MURILO POLATI RECHINELLI</p>
                </p>
                <p>
                  Gerente de Assessoria-Geral
                  <br />
                  <p className="nomes"> LETÍCIA FRANCO DE ARAÚJO</p>
                </p>
                <p>
                  Gerente Técnico-Policial
                  <br />
                  <p className="nomes"> ISIS SANTANA LEAL PASSERINI</p>
                </p>
                <p>
                  Superintendente de Polícia Judiciária
                  <br />
                  <p className="nomes"> MARCELO AIRES MEDEIROS</p>
                </p>
              </div>
              <div className="bloco ">
                <p>
                  Superintendente de Correições e Disciplina
                  <br />
                  <p className="nomes"> THIAGO DAMASCENO RIBEIRO</p>
                </p>
                <p>
                  Diretor da Escola Superior da Policia Civil
                  <br />
                  <p className="nomes"> TATYANE GONÇALVES CRUVINEL</p>
                </p>
                <p>
                  Superintendente de Gestão Integrada
                  <br />
                  <p className="nomes"> RENATA CHEIM GOMES ROCHA</p>
                </p>
                <p>
                  Superintendente de Inteligência Policia Civil
                  <br />
                  <p className="nomes">
                    GUSTAVO RIBEIRO DA COSTA RIGO GUIMARÃES
                  </p>
                </p>
                <p>
                  Gerência de Comunicação e Cerimonial
                  <br />
                  <p className="nomes"> PAULA MEOTTI</p>
                </p>
              </div>
            </div>
          </body>
        </div>
        <div>
          <Sumario numero={numero} data={data} />
        </div>
      </div>
    </>
  );
}
