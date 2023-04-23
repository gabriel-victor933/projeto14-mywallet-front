import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'

export default function SignUpPage() {


  const [form, setForm] = useState({name: "" ,email:"", password: "", confirm: ""})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  function handleForms(e){

    setForm({...form,[e.target.name]:e.target.value})
  }

  function handleSubmit(e){
    e.preventDefault()

    if(form.password !== form.confirm){
      alert("senhas diferentes")
      return 
    }

    setLoading(true)
    axios.post(`${process.env.REACT_APP_API_URL}/cadastro`,{name: form.name, email: form.email,password: form.password})
    .then((response)=>{
      navigate("/")
      
    })
    .catch((err)=>{
      alert(err.response.data)
      setLoading(false)
    })

  }

  return (
    <SingUpContainer>
      {!loading &&<> <form onSubmit={handleSubmit} >
        <MyWalletLogo />
        <input placeholder="Nome" type="text" name="name" required onChange={handleForms} disabled={loading}/>
        <input placeholder="E-mail" type="email" name="email" required onChange={handleForms} disabled={loading}/>
        <input placeholder="Senha" type="password" autoComplete="new-password" name="password" required onChange={handleForms} disabled={loading}/>
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" name="confirm" required onChange={handleForms} disabled={loading}/>
        <button disabled={loading}>Cadastrar</button>
      </form>
      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
      </>}
      

      {loading && <TailSpin height="100" width="100" color="lightgray" />}

      
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
