import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'
import { useForm } from "react-hook-form";


export default function SignUpPage() {

  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: {errors}} = useForm()

  const navigate = useNavigate()




  function onSubmit(form){

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
     {!loading &&<> <form onSubmit={handleSubmit(onSubmit)} >
        <MyWalletLogo />
        <input placeholder="Nome" type="text" {...register("name",{ required:"Por favor, preencha o campo nome."})}  disabled={loading} />
        {errors.name?.message !== undefined &&<p>{errors.name?.message}</p>}
        <input placeholder="E-mail" type="email" {...register("email",{ required:"Por favor, preencha o campo email." }) } disabled={loading} />
        {errors.email?.message !== undefined &&<p>{errors.email?.message}</p>}
        <input placeholder="Senha" type="password"  {...register("password",{ required:"Por favor, preencha o campo senha.", minLength: {value: 3, message: "A senha deve ter pelo menos 3 caracteres"} })} disabled={loading} />
        {errors.password?.message !== undefined &&<p>{errors.password?.message}</p>}
        <input placeholder="Confirme a senha" type="password" {...register("confirm",{ required:"Por favor, preencha o campo confirmar senha.", minLength: {value: 3, message: "A senha deve ter pelo menos 3 caracteres"} })} disabled={loading} />
        {errors.confirm?.message !== undefined &&<p>{errors.confirm?.message}</p>}
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

  p {
    color: white;
    font-size: 16px;
    text-align: left;
    width: 100%;

  }
`
