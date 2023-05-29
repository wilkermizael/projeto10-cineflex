import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
export default function SeatsPage(props) {
  // eslint-disable-next-line react/prop-types
  const {setReserva} = props  
  const Navigate = useNavigate()
  const [assentos, setAssentos] = useState([])
  const [movie, setMovie] = useState([])
  const [day, setDay] = useState([])
  const [hours, setHours] = useState([])
  const { idSeats } = useParams()
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [meulugar, setmeulugar] = useState([]);
  const [nomeLugar, setNomeLugar] = useState([])
  
 
  useEffect(() => {
    const assentosFilme = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSeats}/seats`,
    )
    console.log(idSeats)
    assentosFilme.then((resposta) => {
      setAssentos(resposta.data.seats)
      setMovie(resposta.data.movie)
      setDay(resposta.data.day)
      setHours(resposta.data.name)
      //console.log(resposta.data.seats)
    })
    assentosFilme.catch((erro) => {
      if (erro.response) {
        console.log('Deu erro')
      }
    })
  }, [idSeats])

  function escolhaSeat(lugar, Available, itemName) {
    if(Available === false){
        alert('Esse assento não está disponível.')
    }else if(meulugar.includes(lugar)){
        const meuLugarFiltro = meulugar.filter( item => item !== lugar )
        const nomeLugarFiltro = nomeLugar.filter(item => item !== itemName )
        setmeulugar([...meuLugarFiltro])
        setNomeLugar([...nomeLugarFiltro])
    }else{
        setmeulugar([...meulugar , lugar])
        setNomeLugar([...nomeLugar, itemName])
    }
    
    

  }

  function login(event) {
    
    event.preventDefault()
    let informacoes={
        filme:movie.title,
        nomeComprador: nome,
        cpf: cpf,
        data:day.date,
        hora:hours,
        assentos: nomeLugar
    }
    setReserva(informacoes)

    let dados = {
      ids: meulugar,
      name: nome,
      cpf: cpf,
    }
    console.log(dados)
    const envio =axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many',dados)
    envio.then( () => Navigate('/sucesso') )

  }

  /*todosOsLugares = assentos.map((item) => 
        <div key={item.id}>
            <SeatItem onClick={()=>escolhaSeat(item.id)} >
                {item.name}
            </SeatItem>
        </div>)*/

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {assentos.map((item) => (
          <div data-test="seat" key={item.id}>
          <SeatItem  corSelecionada={meulugar.includes(item.id)? '#1AAE9E' : item.isAvailable ? '#C3CFD9' :'#FBE192' } onClick={() => escolhaSeat(item.id, item.isAvailable, item.name)}>
            {item.name}
          </SeatItem>
          </div>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle corFundo={'#1AAE9E'} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle corFundo={'#C3CFD9'} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle corFundo={'#FBE192'} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={login}>
        <label htmlFor="meunome">Nome do Comprador:</label>
        <input data-test="client-name"
          type={'text'}
          id="meunome"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome..."
        />

        <label htmlFor="senha"> CPF do Comprador:</label>
        <input data-test="client-cpf"
          type={'password'}
          id="senha"
          required
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite seu CPF..."
        />
    
          <button type="submit">Reservar Assento(s)</button>
        
      </FormContainer>
      <div data-test="footer">
        <FooterContainer>
            <div>
            <img src={movie.posterURL} alt="poster" />
            </div>

            <div>
            <p>{movie.title}</p>
            <p>
                {' '}
                {day.weekday} -{hours}
            </p>
            </div>
        </FooterContainer>
      </div>
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
  padding-bottom: 120px;
  padding-top: 70px;
`
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`
const CaptionCircle = styled.div`
  border: 1px solid blue; // Essa cor deve mudar
  background-color: ${(props) => props.corFundo};
  //background-color: lightblue;    // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`
const SeatItem = styled.button`
  border: 1px solid blue; // Essa cor deve mudar
  background-color: ${(props) => props.corSelecionada}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: 'Roboto';
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  background-color: ${(props) => props.fundo};
`
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
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
