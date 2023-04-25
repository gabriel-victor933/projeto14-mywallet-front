import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import { useMemo } from "react";


export const Context = createContext()

export default function AppContext({children}){

    const [itens, setItens] = useState([])
    const [selecionado, setSelecionado] = useState("")

    const total = useMemo(()=>{
        return calcularTotal()
    },[itens])

    function selecionar(item){
        setSelecionado(item)
    }

    function CarregarItens(token){

        const config = { headers: { Authorization: `Bearer ${token}` } }
        axios.get(`${process.env.REACT_APP_API_URL}/transacoes`, config)
            .then((dados) => {

                setItens(dados.data)
                

            })
            .catch((err) => {
                console.log(err)
            })
    }

    function calcularTotal(){

        let soma = 0
    
        itens.forEach((item)=>{
          if(item.tipo === "entrada"){
            soma += item.valor
          }else{
            soma -= item.valor
          }
        })
    
        return soma
      }

    function handleDelete(id,token) {

        if (!window.confirm()) return

        const config = { headers: { Authorization: `Bearer ${token}` } }

        axios.delete(`${process.env.REACT_APP_API_URL}/transacoes/${id}`, config)
            .catch((erro) => {
                alert(`Não foi possivel excluir a transação: ${erro.response.data}`)
                setItens([...itens])
            })
        
        const novoItens = itens.filter((item) => item._id !== id)
        setItens(novoItens)
    }

    return (
        <Context.Provider value={{selecionar, selecionado,total,itens,CarregarItens,handleDelete}}>
            {children}
        </Context.Provider>
    )

}