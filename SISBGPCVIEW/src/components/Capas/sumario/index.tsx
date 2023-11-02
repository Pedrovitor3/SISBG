import React from 'react';
import './index.css';
import Header from '../header';

export default function Sumario({ numero, data }: any) {
  return (
    <>
      <div id="sumario">
        <div className="container-sumario">
          <Header numero={numero} data={data} indice={2} />
          <h1>Sumário</h1>
          <h2>1 - Atos do Conselho Superior da Polícia Civil:</h2>
          <h3>1.1 - Resoluções</h3>

          <h3>1.2 - Despachos Decisórios</h3>

          <h2>2 - Atos do Delegado-Geral da Polícia Civil:</h2>
          <h3>2.1 – Movimentação de Pessoal</h3>
          <ol>
            <li>
              <p>2.1.1 - Portarias</p>
            </li>
            <li>
              <p>2.1.2 - Portarias Eletrônicas</p>
            </li>
            <li>
              <p>2.1.3 - Ordem de Missão Policial</p>
            </li>
            <li>
              <p>2.1.4 - Ordem de Missão Policial Eletrônica</p>
            </li>
          </ol>

          <h3>2.2 – Atos Administrativos</h3>
          <ol>
            <li>
              <p>2.2.1 - Portarias</p>
            </li>
            <li>
              <p>2.2.2 - Ordem de Missão Policial</p>
            </li>
          </ol>
          <h3>2.3 – Nota Técnica</h3>

          <h2>3 – Atos da Titular da Gerência Técnico-Policial</h2>
          <h3>3.1 – Atos Administrativos</h3>
          <ol>
            <li>
              <p>3.1.1 - Portarias</p>
            </li>
            <li>
              <p>3.1.2 - Despachos Decisórios</p>
            </li>
          </ol>
          <h2>4 – Atos do Superintendente de Polícia Judiciária:</h2>
          <h3>4.1 – Movimentação de Pessoal</h3>
          <ol>
            <li>
              <p>4.1.1 - Portarias</p>
            </li>
            <li>
              <p>4.1.2 - Portarias Eletrônicas</p>
            </li>
            <li>
              <p>4.1.3 - Ordem de Missão Policial</p>
            </li>
            <li>
              <p>4.1.4 - Ordem de Missão Policial Eletrônica</p>
            </li>
          </ol>
          <h3>4.2 – Atos Administrativos</h3>
          <ol>
            <li>
              <p>4.2.1 - Portarias</p>
            </li>
            <li>
              <p>4.2.2 - Ordem de Missão Policial</p>
            </li>
            <li>
              <p>4.2.3 - Edital</p>
            </li>
          </ol>
          <br />
          <br />
          <br />
          <Header numero={numero} data={data} indice={3} />
          <h2>5 – Atos do Superintendente de Gestão Integrada</h2>
          <h3>5.1 – Movimentação de Pessoal</h3>
          <ol>
            <li>
              <p>5.1.1 - Portarias</p>
            </li>
            <li>
              <p>5.1.2 - Portarias Eletrônicas</p>
            </li>
            <li>
              <p>5.1.3 - Ordem de Missão Policial</p>
            </li>
            <li>
              <p>5.1.4 - Ordem de Missão Policial Eletrônica</p>
            </li>
          </ol>
          <h3>5.2 – Atos Administrativos</h3>
          <ol>
            <li>
              <p>5.2.1 - Portarias</p>
            </li>
          </ol>

          <h2>6 – Atos da Escola Superior da Polícia Civil</h2>
          <h3>6.1 – Administração</h3>
          <ol>
            <li>
              <p>6.1.1 - Portarias</p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
