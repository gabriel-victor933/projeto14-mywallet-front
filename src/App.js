import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import EditPage from "./pages/EditPage"
import AppContext from "./AppContext"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <AppContext>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
            <Route path="/editar-registro/:tipo" element={<EditPage />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </AppContext>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: 100%;
  max-height: 100vh;
  box-sizing: border-box;
  padding: 0px 25px ;
`
