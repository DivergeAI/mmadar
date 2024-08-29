import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/layout";
import Workspace from "../pages/Workspace";
import Prompts from "../pages/Workspace/Prompts";
import Documents from "../pages/Workspace/Documents";
import Tools from "../pages/Workspace/Tools";
import Functions from "../pages/Workspace/Functions";
import Models from "../pages/Workspace/Models";
import CreateModal from "../pages/Workspace/Models/CreateModal";


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
            { path: "", element: <Navigate to="models" replace /> }, // Redirect to models
            { path: "models", element: <Models />,
              children: [
                {path : 'create', element : <CreateModal /> },
              ]
            },
            { path: "prompts", element: <Prompts /> },
            { path: "documents", element: <Documents /> },

            { path: "tools", element: <Tools /> },
            { path: "functions", element: <Functions /> },

          ],
        },
      ],
    },
  ]);
  