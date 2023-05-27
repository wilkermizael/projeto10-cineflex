import styled from "styled-components"
import { useEffect} from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
export default function SessionsPage() {
    const [informacoes , setInformacoes] = useState('')
    const [data, setData] = useState([])
    const {idFilmes} = useParams()
    
    useEffect(()=>{
        const sessaoFilme = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilmes}/showtimes`)
        sessaoFilme.then( resposta =>{
            setInformacoes(resposta.data);
            setData(resposta.data.days)
            //console.log(informacoes.days[0].weekday)
        })
        sessaoFilme.catch(erro =>{
            if(erro.response){
            console.log("Deu erro")}
        })
    },[idFilmes])
      
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {data.map((item) =>
                <div key={item.date}>
                <SessionContainer key={item.date}>
                    {item.weekday} - {item.date}
                    <ButtonsContainer>
                        <button>{item.showtimes[0].name}</button>
                        <button>{item.showtimes[1].name}</button>
                    </ButtonsContainer>
                </SessionContainer>
                </div>
                 )}
                
        
            </div>

            <FooterContainer>
                <div>
                    <img src={informacoes.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{informacoes.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    font-family: 'Roboto';
    button {
        margin-right: 20px;
        background-color: #E8833A;
        width: 82px;
        height: 43px;
        border-radius: 5px;
        color: white;
        font-size: 18px;
        
        
    }
    a {
        text-decoration: none;
        
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`