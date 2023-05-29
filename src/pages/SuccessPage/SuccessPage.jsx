/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage(props) {
    // eslint-disable-next-line react/prop-types
    const {reserva} = props
    const Navigate = useNavigate()
    console.log(reserva)
    function voltarParaHome(){
        Navigate('/')
    }
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>
            <div data-test="movie-info">
                <TextContainer>
                    <strong><p>Filme e sessão</p></strong>
                    <p>{reserva.filme}</p>
                    <p>{reserva.data} - {reserva.hora}</p>
                </TextContainer>
            </div>
            
            <div data-test="seats-info">
                <TextContainer>
                    <strong><p>Ingressos</p></strong>
                    {reserva.assentos.map(item =><p key={item}>Assento: {item}</p> )}
                
                </TextContainer>
            </div>
            
            <div data-test="client-info">
                <TextContainer>
                    <strong><p>Comprador</p></strong>
                    <p>Nome: {reserva.nomeComprador}</p>
                    <p>CPF: {reserva.cpf}</p>
                </TextContainer>
            </div>
            
            <button data-test="go-home-btn" onClick={voltarParaHome}>Voltar para Home</button>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`