import styled from "styled-components"
import {BiHomeAlt2} from "react-icons/bi"
import { useNavigate } from "react-router-dom";

export default function NotFound(){

    const navigate = useNavigate()

    return (<>
        <Container>
            <h1>404</h1>
            <h1>Page not found</h1>
            <button><BiHomeAlt2 onClick={()=>{navigate("/home")}}/></button>
        </Container>
    </>)
}

const Container = styled.section`
      height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 25px;
    }

    button {
        background-color: transparent;
        font-size: 40px;
    }
`;