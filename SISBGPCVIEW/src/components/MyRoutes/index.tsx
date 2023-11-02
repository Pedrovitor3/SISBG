import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sistema from '../../pages/sistema';

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sistema />} />
        {/*<Route path='' element={<Navigate to='/' replace />} />*/}
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
