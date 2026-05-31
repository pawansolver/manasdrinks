// @ts-nocheck
import '../index.css';
import { CartProvider } from '../Components/CartContext';

export const metadata = {
  title: 'Next.js App',
  description: 'Converted project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
