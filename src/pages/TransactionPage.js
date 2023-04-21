import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

export default function TransactionsPage() {

  const [form,setForm] = useState({valor:0,descricao:""})
  const [loading,setLoading] = useState(false)

  const {tipo} = useParams()
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  function handleChange(e){

    setForm({...form,[e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()


    const data = {valor: parseFloat(form.valor), descricao: form.descricao}
    
    const config = { headers: { Authorization: `Bearer ${token}`}}

    setLoading(true)

    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`,data,config)
    .then((resposta)=>{
      navigate("/home")
    })
    .catch((erro)=>{
      alert(erro.response.data)
      setLoading(false)
    })

  }

  useEffect(()=>{
    if(token === null){
      navigate("/")
    }
  },[token,navigate])

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Valor" type="number" step=".01" name="valor" min="0" onChange={handleChange} disabled={loading} required/>
        <input placeholder="Descrição" type="text" name="descricao" onChange={handleChange} disabled={loading} required/>
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  box-sizing: border-box;
  padding: 20px 0px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
