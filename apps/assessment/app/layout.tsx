import { Toaster } from '@urfine/components/toast';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'urfine.com',
  description: 'Check your Check list',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
