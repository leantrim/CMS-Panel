import Main from '@/components/Main';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS - MediaPartners AB',
  description: '...',
  openGraph: {
    title: 'CMS | MediaPartners AB',
    description: 'Content managment system for Media Partners AB',
    url: 'https://cms.mediapartners.se',
    siteName: 'Conntent Managment System',
    images: 'https://mediapartners.se/_next/image?url=%2Fimages%2Fmediapartners-nobg.png&w=640&q=75',
  },
};

export default function Home() {
  return (
    <main>
      <div>
        <Main />
      </div>
    </main>
  );
}
