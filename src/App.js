import {useState} from 'react'
import {FiSearch} from 'react-icons/fi'
import './styles.css'
import api from './Services/api'

function App() {
  
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  
  async function handleSearch(){
    //13468570

    if(input === ''){
      alert('Digite o seu CEP')
      return
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert('Esse CEP é inválido');
      setInput("");
    }
  }
  
  return (
    <div className="container">
      <h1 className="title">Busca Cep</h1>
      
      <div className="containerInput">
        <input
         type="text"
         placeholder="Digite o CEP"
         value={input}
        onChange={(event) => setInput(event.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'/>

        </button>
      </div>
    
    
    {Object.keys(cep).length > 0 && (
  
  <main className='principal'>
      <h2>CEP: {cep.cep}</h2>

      <span> {cep.logradouro} </span>
      <span>{cep.complemento }</span>
      <span>  {cep.bairro} </span>
      <span> {cep.localidade} - {cep.uf} </span>
 </main>

    )}
  
    </div>
  );
}

export default App;