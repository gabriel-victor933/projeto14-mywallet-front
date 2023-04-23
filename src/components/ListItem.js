import styled from "styled-components"
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../AppContext";

export default function LIstItem({item, token}){

  const navigate = useNavigate()
  const {selecionar,handleDelete} = useContext(Context)  

  function changePage(){
    selecionar(item)
    navigate(`/editar-registro/${item.tipo}`)
  }

    return (
        <ListItemContainer>
            <div>
              <span>{item.data}</span>
              <strong onClick={changePage}>{item.descricao}</strong>
            </div>
            <div>
              <Valor color={item.tipo}>{item.valor}</Valor>
              <BsX className="icone" onClick={() => handleDelete(item._id,token)}/>
            </div>
            
        </ListItemContainer>
    )
}

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  font-size: 16px;

  span {
    color: #c6c6c6;
    margin-right: 10px;
  }

  div{
    display: flex;
    align-items: center;
  }

  .icone {
    font-size: 25px;
    color: lightgray;
    margin-left: 5px;
  }
  strong {
    :hover{
      font-size: 18px;
      cursor: pointer;
    }
  }
`

const Valor = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color ==="entrada"  ? "green" : "red")};

`