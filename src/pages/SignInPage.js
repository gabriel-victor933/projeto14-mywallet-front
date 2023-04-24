import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'
import { useForm } from "react-hook-form";



export default function SignInPage() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const [loading, setLoading] = useState(false) 
  const navigate = useNavigate()


  function onSubmit(form){

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
      {!loading && <><form onSubmit={handleSubmit(onSubmit)}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" {...register("email",{ required:"Por favor, preencha o campo email." }) } disabled={loading} />
        {errors.email?.message !== undefined &&<p>{errors.email?.message}</p>}
        <input placeholder="Senha" type="password"  {...register("password",{ required:"Por favor, preencha o campo senha.", minLength: {value: 3, message: "A senha deve ter pelo menos 3 caracteres"} })} disabled={loading} />
        {errors.password?.message !== undefined &&<p>{errors.password?.message}</p>}
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

  p {
    color: white;
    font-size: 16px;
    text-align: left;
    width: 100%;

  }
`
