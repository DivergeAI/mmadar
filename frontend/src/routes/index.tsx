import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/layout";
import Workspace from "../pages/Workspace";
import Prompts from "../pages/Workspace/Prompts/Prompts";
import Documents from "../pages/Workspace/Documents/Documents";
import Tools from "../pages/Workspace/Tools";
import Functions from "../pages/Workspace/Functions";
import Models from "../pages/Workspace/Models";
import CreateModal from "../pages/Workspace/Models/CreateModal";
import CreatePrompt from "../pages/Workspace/Prompts/CreatePrompt";
import Chat from "../pages/Chat";
import Admin from "../pages/AdminPannel";
import AdminSetting from "../pages/AdminPannel/AdminSetting";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "workspace",
        element: <Workspace />,
        children: [
          { path: "", element: <Navigate to="documents" replace /> }, // Redirect to models
          {
            path: "models",
            element: <Models />,
            children: [{ path: "create", element: <CreateModal /> }],
          },
          { path: "prompts", element: <Prompts /> },
          { path: "prompts/create", element: <CreatePrompt /> },
          { path: "documents", element: <Documents /> },
          { path: "tools", element: <Tools /> },
          { path: "functions", element: <Functions /> },
        ],
      },
      { path: "chat/:id", element: <Chat /> },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "", element: <Navigate to="" replace /> },
          { path: "settings", element:<AdminSetting/> },
        ],
      },
    ],
  },
]);
