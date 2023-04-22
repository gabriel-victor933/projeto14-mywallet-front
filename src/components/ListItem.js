import styled from "styled-components"
import { BsX } from "react-icons/bs";

export default function LIstItem({id,descricao, valor, tipo,data, handleDelete}){

    return (
        <ListItemContainer>
            <div>
              <span>{data}</span>
              <strong>{descricao}</strong>
            </div>
            <div>
              <Valor color={tipo}>{valor}</Valor>
              <BsX className="icone" onClick={() => handleDelete(id)}/>
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
`

const Valor = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color ==="entrada"  ? "green" : "red")};
`