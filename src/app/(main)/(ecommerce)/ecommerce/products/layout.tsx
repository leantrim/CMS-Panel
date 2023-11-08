import { ReduxProvider } from './redux/prodiver';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border shadow-sm rounded-md">
      <ReduxProvider>{children}</ReduxProvider>
    </div>
  );
}
