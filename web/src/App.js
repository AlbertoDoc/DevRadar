import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/Devitem/index.js';
import DevForm from './components/DevForm/index.js';


// Componente: Eh uma funcao que retorna algum conteudo html/css/js
// Propriedade: Informacoes que um componente pai passa para o compenente filho
// Estado: Informacoes mantidas pelo componente (lembrar do conceito de imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
