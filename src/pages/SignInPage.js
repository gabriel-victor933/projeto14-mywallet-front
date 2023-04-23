import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'


export default function SignInPage() {

  const [form, setForm] = useState({email: "",password:""})
  const [loading, setLoading] = useState(false) 
  const navigate = useNavigate()

  function handleChange(e){

    setForm({...form,[e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()

    setLoading(true)
    axios.post(`${process.env.REACT_APP_API_URL}`,{email: form.email, password: form.password})
    .then((response)=>{

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
    
      navigate("/home")
    })
    .catch((err)=>{
      alert(err.response.data)
      setLoading(false)
    })
  }
  return (
    <SingInContainer>
      {!loading && <><form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" name="email" onChange={handleChange} required disabled={loading}/>
        <input placeholder="Senha" type="password" autoComplete="new-password" name="password" onChange={handleChange} required disabled={loading}/>
        <button>Entrar</button>
      </form>
      <Link to="/cadastro" >
        Primeira vez? Cadastre-se!
      </Link>
      </>}

      {loading && <TailSpin height="100" width="100" color="lightgray" />}


      
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
