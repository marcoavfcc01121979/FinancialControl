import React, {useContext, useState} from 'react';

import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';

import {Background, Container, Nome, Saldo, Title, List} from './styles';
import {AuthContext} from '../../contexts/auth';
const Home = () => {
  const [historico, setHistorico] = useState([
    {key: '1', tipo: 'receita', valor: 1200},
    {key: '2', tipo: 'despesa', valor: 100},
    {key: '3', tipo: 'receita', valor: 200},
    {key: '4', tipo: 'receita', valor: 10},
    {key: '5', tipo: 'despesa', valor: 120},
    {key: '6', tipo: 'despesa', valor: 80},
    {key: '7', tipo: 'receita', valor: 40},
    {key: '8', tipo: 'receita', valor: 50},
  ]);
  const {user} = useContext(AuthContext);

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ 123.00</Saldo>
      </Container>

      <Title>Ultimas movimetações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({item}) => <HistoricoList data={item} />}
      />
    </Background>
  );
};

export default Home;
