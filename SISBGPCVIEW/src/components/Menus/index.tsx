import {
  ContainerOutlined,
  DesktopOutlined,
  PaperClipOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import { perfisSistema } from '../../configs/sistemaConfig';

export const menus = [
  /*{
    label: 'Dashboard',
    key: '1',
    icon: <DesktopOutlined />,
    link: '/dashboard',
    perfis: [perfisSistema.ALL],
    children: [],
  },
  {
    label: 'teste',
    key: '3',
    icon: <DesktopOutlined />,
    link: '/teste',
    perfis: [perfisSistema.ALL],
    children: [],
  },*/
  {
    label: 'Boletim',
    key: '4',
    icon: <ContainerOutlined />,
    link: '/boletim',
    perfis: [perfisSistema.ALL],
    children: [],
  },
  {
    label: 'Tipos',
    key: '7',
    icon: <PartitionOutlined />,
    link: '/',
    perfis: [perfisSistema.ALL],
    children: [],
  },
  /*
     '5': Bloco
      6': Documentos
  */
];
