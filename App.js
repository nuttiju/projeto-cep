import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    cep: '',
    rua: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (!e.target.value) return;
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFormData({
          ...formData,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
        });
      }).catch((err) => console.log(err));
  }

  return (
    <form >
      <h1 class="titulo_cep">Busca CEP</h1>
      <label class="subtitulo">
        CEP:
        <input
          type="text"
          value={formData.cep}
          onChange={e => setFormData({ ...formData, cep: e.target.value })}
          onBlur={checkCEP}
        />
      </label>
      <label class="subtitulo">
        Rua:
        <input type="text" value={formData.rua} />
      </label>
      <label class="subtitulo">
        Bairro:
        <input type="text" value={formData.bairro} />
      </label >
      <label class="subtitulo">
        Cidade:
        <input type="text" value={formData.cidade} />
      </label>
      <label class="subtitulo">
        Estado:
        <input type="text" value={formData.uf} />
      </label>
    </form>
  );
}

export default App;
