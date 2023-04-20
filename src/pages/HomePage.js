import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import URL from "../constants/Urls"
import axios from "axios"
import LIstItem from "../components/ListItem"

export default function HomePage() {

  const [itens, setItens] = useState([])
  const [total, setTotal] = useState(0)
  const [name, setName] = useState("")

  function calcularTotal(dados){

    let soma = 0

    dados.forEach((item)=>{
      if(item.tipo === "entrada"){
        soma += item.valor
      }else{
        soma -= item.valor
      }
    })

    setTotal(soma)
  }

  useEffect(()=>{

    const token = localStorage.getItem("token")

    const config = { headers: { Authorization: `Bearer ${token}`}}

    axios.get(`${URL}/transacoes`,config)
    .then((dados)=>{
      console.log(dados)
      setItens(dados.data.transacoes)
      calcularTotal(dados.data.transacoes)
      setName(dados.data.name)

    })
    .catch((err)=>{
      console.log(err)
    })

  },[])


  console.log(itens)
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>

          {itens.map((item)=> <LIstItem key={item._id} data={item.data} descricao={item.descricao} valor={item.valor} tipo={item.tipo}/>)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={total >= 0 ? "green": "red"}>{total.toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px 0px;
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;

  ul {
    overflow-y: scroll;
    height: 90%;
  }


  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props)=>props.color};
`
