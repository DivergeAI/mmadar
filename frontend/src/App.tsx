import { Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/layout'
import { ThemeProvider } from './theme/ThemeProvider'
import Home from './pages/Home'
import Workspace from './pages/Workspace/Prompts/Prompts'
import { router } from './routes'

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
