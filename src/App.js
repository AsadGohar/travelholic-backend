import axios from 'axios';
import React from 'react';
import AdminPanel from "./components/admin-panel/AdminPanel";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const App = () => {

  return (
    <div>
      <ToastContainer />
      <AdminPanel />
    </div>
  );
}

export default App;
