import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../AppContext"
import { useContext } from "react"
import { TailSpin } from 'react-loader-spinner'


export default function EditPage() {

    const {selecionado} = useContext(Context)

    const [form,setForm] = useState({valor:selecionado.valor,descricao:selecionado.descricao})
    const [loading,setLoading] = useState(false)

    const {tipo} = useParams()
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    function handleChange(e){

        setForm({...form,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()

        const config = { headers: { Authorization: `Bearer ${token}` } }

        const data = {...form, valor: parseFloat(form.valor)}
        

        setLoading(true)
        axios.put(`${process.env.REACT_APP_API_URL}/transacoes/${selecionado._id}`,data,config)
        .then((dados)=>{
            navigate("/home")
        })
        .catch((erro)=>{
            alert("Não foi possivel editar a transação: " + erro.response.data)
            setLoading(false)
        })
    }

    useEffect(()=>{
        console.log("useEffect pagina edit")

        if(token === null){
        navigate("/")
        }
    },[token,navigate])

    return (
        <TransactionsContainer>
        <h1>Editar {tipo}</h1>
        {!loading && <form onSubmit={handleSubmit}>
            <input placeholder="Valor" type="number" step=".01" name="valor" min="0" value={form.valor} onChange={handleChange} disabled={loading} required/>
            <input placeholder="Descrição" type="text" name="descricao" value={form.descricao} onChange={handleChange} disabled={loading} required/>
            <button>Atualizar {tipo}</button>
        </form>}
        {loading && <TailSpin height="100" width="100" color="lightgray" />}
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
