import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <div style={{ width: '100%', marginTop: '128px' }}>
      <Skeleton height={77} count={5} width={848} baseColor="grey" style={{ marginBottom: '24px' }} />
    </div>
  );
}
