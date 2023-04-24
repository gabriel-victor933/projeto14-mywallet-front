import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { Context } from "../AppContext"
import { useContext } from "react"
import { TailSpin } from 'react-loader-spinner'
import { useForm } from "react-hook-form";


export default function EditPage() {

    const {selecionado} = useContext(Context)
    console.log(selecionado)
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {valor: selecionado.valor, descricao: selecionado.descricao}})
    const [loading,setLoading] = useState(false)

    const {tipo} = useParams()
    const navigate = useNavigate()

    const token = localStorage.getItem("token")



    useEffect(()=>{

        if(token === null){
        navigate("/")
        }
    },[token,navigate])


    function onSubmit(form){
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

    return (
        <TransactionsContainer>
        <h1>Editar {tipo}</h1>
        {!loading && <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Valor" type="number" step=".01" min="0" {...register("valor",{ required:"Por favor, preencha o campo valor." }) } disabled={loading} />
        {errors.valor?.message !== undefined &&<p>{errors.valor?.message}</p>}
        <input placeholder="Descricao" type="text"  {...register("descricao",{ required:"Por favor, preencha o campo descricão."})} disabled={loading} />
        {errors.descricao?.message !== undefined &&<p>{errors.descricao?.message}</p>}
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

  p {
    color: white;
    font-size: 16px;
    text-align: left;
    width: 100%;

  }
`
