import styled from "styled-components"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react"


export default function App() {
    const [reserva, setReserva] = useState({})
    axios.defaults.headers.common["Authorization"] = "iPZD20Gl3D27ZLzrmsNtZOMX"
    return (
        <BrowserRouter>
           <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element ={<HomePage/>} />
                <Route path="sessoes/:idFilmes" element={<SessionsPage /> } />
                <Route path="seats/:idSeats" element={<SeatsPage setReserva={setReserva}/>} />
                <Route path="sucesso/" element={<SuccessPage reserva={reserva}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
