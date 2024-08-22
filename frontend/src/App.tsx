import { Fragment } from 'react'
import './App.css'
import Layout from './pages/layout'
import { ThemeProvider } from './theme/ThemeProvider'

function App() {

  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}

export default App
