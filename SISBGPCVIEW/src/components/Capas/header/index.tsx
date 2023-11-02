import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import logo from '../../../assets/devPvBlackd.jpeg';

require('./index.css');

type Props = {
  numero: any;
  data: any;
  indice: any;
};
export default function Header({ numero, data, indice }: Props) {
  // Parse the date string to a Date object
  const dateObj = parse(data, 'dd/MM/yyyy', new Date());

  // Check if the parsed date is valid
  const isValidDate = !isNaN(dateObj.getTime());

  // Format the date to be displayed as Brazilian format or display an error message
  const formattedDate = isValidDate
    ? format(dateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : 'Invalid Date';
  return (
    <div className="container-header">
      <nav className="header">
        <p>
          Goiânia,
          <span> </span>
          {isValidDate ? formattedDate : 'Invalid Date'} - Boletim Geral n°
          {numero}
        </p>
        <img src={logo} alt="brasão-header" className="brasao-header" />
        <p className="indice-header">{indice}</p>
      </nav>
    </div>
  );
}
