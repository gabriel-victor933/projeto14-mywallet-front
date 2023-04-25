import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect,  useContext } from "react"
import LIstItem from "../components/ListItem"
import { useNavigate,Link } from "react-router-dom"
import { Context } from "../AppContext"

export default function HomePage() {

  
  const navigate = useNavigate()

  const {itens,total,CarregarItens} = useContext(Context)

  const token = localStorage.getItem("token")
  const name = localStorage.getItem("name")


  useEffect(()=>{

    if(token){
      CarregarItens(token)
    } else {
      navigate("/")
    }

  },[navigate,token])


  function conditionalComponent(){
    if(itens.length >0){
      return (<>
          <ul>
            {itens.map((item) => <LIstItem key={item._id} item={item} token={token}/>)}
          </ul>
          <article>
            <strong>Saldo</strong>
            <Value color={total >= 0 ? "green" : "red"}>{total.toFixed(2)}</Value>
          </article>
      </>)
    } else {
      return (<h3>Não há registros de
        entrada ou saída</h3>)
      
    }
  }

  function logOut(){
    localStorage.removeItem("token")
    navigate("/")
  }




  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <BiExit onClick={logOut}/>
      </Header>

      <TransactionsContainer>
      {conditionalComponent()}
      </TransactionsContainer>



      <ButtonsContainer>
        <Link to="/nova-transacao/entrada">
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to="/nova-transacao/saida">
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
        </Link>
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
  height: 60vh;
  position: relative;

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

  h3 {
    width: 250px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    position: absolute;
    top: 50%;
    left: calc(50% - 125px);
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  a {
    width: 50%;

    button {
    width: 100%;
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
  }
  
  
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props)=>props.color};
`
