import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'sonner';
import CommandPalette from './components/common/CommandPalette';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
          <Toaster position="top-right" richColors closeButton />
          <CommandPalette />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
