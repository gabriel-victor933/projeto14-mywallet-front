import styled from "styled-components"

export default function LIstItem({descricao, valor, tipo,data}){

    return (
        <ListItemContainer>
            <div>
              <span>{data}</span>
              <strong>{descricao}</strong>
            </div>
            <Valor color={tipo}>{valor}</Valor>
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
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const Valor = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color ==="entrada"  ? "green" : "red")};
`