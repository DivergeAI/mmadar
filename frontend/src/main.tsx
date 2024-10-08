import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './theme/ThemeProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SocketProvider from './Context/SocketContext.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/index.ts'

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <SocketProvider>
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </ThemeProvider>
    </SocketProvider>
    </Provider>
  </StrictMode>,
)
