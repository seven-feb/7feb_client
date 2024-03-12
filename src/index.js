import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from "./pages/Register";
import SalesPredictions from "./pages/SalesPredictions";
import Inventory from "./pages/Inventory";
import ServiceRatio from "./pages/ServiceRatio";
import Chatbot from "./pages/Chatbot";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App/>,
//         errorElement: <NotFound/>,
//         children: [
//             {index: true, element: <App/>},
//             {path: '/auth/login', element: <Login/>},
//             {path: '/auth/register', element: <Register/>},
//             {path: '/sales-predictions', element: <SalesPredictions/>},
//             {path: '/inventory', element: <Inventory/>},
//             {path: '/service-ratio', element: <ServiceRatio/>},
//             {path: '/chatbot', element: <Chatbot/>},
//         ]
//     }
// ]);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//       <RouterProvider router={router}/>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();