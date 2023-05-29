import styled from "styled-components"
import axios from "axios"
import { Link} from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
export default function HomePage() {
    const [filmes, setFilmes] = useState([])
    
   
    useEffect(()=>{
        const requisao = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
        requisao.then( resposta =>{
            setFilmes(resposta.data);
           console.log(resposta.data)
        })
    },[])
    if( filmes.length === 0){
        return <h1> Carregando....</h1>
    }
    return (
        <PageContainer>
            Selecione o filme
            
            <ListContainer>
               <> 
                {filmes.map((item) =>
                
                <Link to={`/sessoes/${item.id}`} key={item.id}>
                <MovieContainer >
                    <img data-test='movie' src={item.posterURL} alt="poster"/>
                </MovieContainer>
                </Link>
                )}
                
                </>
            </ListContainer>
    

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`