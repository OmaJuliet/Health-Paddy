// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query-devtools'

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <ReactQueryDevtools initialIsOpen />
//     </QueryClientProvider>
//   </React.StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListDetails from './features/todos/ListDetails.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/list/:id" element={<ListDetails />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />} {/* Enable Devtools in development mode */}
    </QueryClientProvider>
  </React.StrictMode>,
)
