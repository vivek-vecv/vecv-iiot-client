import { useParams } from 'react-router-dom';
import HDPage from './HDPage.jsx';

export default function MachinePage() {
  const params = useParams();
  console.log('------------------params-------------------\n', params);

  return <HDPage />;
}
