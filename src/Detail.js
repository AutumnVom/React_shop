import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { 재고context } from './App.js';

import { CSSTransition } from 'react-transition-group';

import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';


const Box = styled.div`
    padding: 20px;
`;

const Title = styled.h4`
    font-size: 25px;
    font-weight: bold;
    color: ${ props => props.color }
    color: ${ props => props.color2 }
`;

function Detail(props) {

    const [alert, setAlert] = useState(true);
    const [inputData, setInputData] = useState('');

    const [tab, setTab] = useState(0);
    const [aniswitch, setAniswitch] = useState(false);

    const 재고 = useContext(재고context);

    useEffect( () => {
      //컴포넌트가 mount update 될때 특정 코드를 실행할 수 있음.
      let timer = setTimeout(()=>{ setAlert(false) }, 2000)//2초 후에 alert 창을 안보이게 해주세요
      return ()=>{ clearTimeout(timer) } //컴포넌트가 사라질 때 특정 코드를 실행할 수 있음.
    },[alert]);

    const { id, id2, id3 } = useParams();
    const findPd = props.shoes.find(function(shoes) {
        return shoes.id == id
    });
    // const findPd = props.shoes.find( x => x.id == id);
    const history = useHistory();

    const new재고= () => {
      new재고 = [...props.재고];
      
    }

    return (
      <div className="container">
        <Box>
            <Title color="red">상세페이지</Title>
        </Box>

        {inputData}
        <input onChange={(e)=>{ setInputData(e.target.value) }}/>

        {
          alert === true
          ? (<div className="my-alert2">
              <p>재고가 얼마 남지 않았습니다.</p>
            </div>)
          : null
        }
        
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{ findPd.title }</h4>
            <p>{ findPd.content }</p>
            <p>{ findPd.price }원</p>
            <Info 재고={props.재고}></Info>
            {/* {재고[0]} 재고context */}
            <button className="btn btn-danger" onClick={ () => {

              props.재고변경([9, 10, 11]);
              props.dispatch({type: '항목추가', payload : {id: findPd.id, name: findPd.title, quan:1} });
              history.push('/cart');

            }}>주문하기</button>
            &nbsp;
            <button className="btn btn-primary" onClick={ () => {
              history.goBack();
            }}>뒤로가기</button>
          </div>
        </div>

        <Nav className="mt-5" fill variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={ ()=>{ setAniswitch(false); setTab(0) }}>상품설명</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={ ()=>{ setAniswitch(false); setTab(1) }}>상세정보</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={ ()=>{ setAniswitch(false); setTab(2) }}>배송 및 환불</Nav.Link>
          </Nav.Item>
        </Nav>

        <CSSTransition in={aniswitch} classnames="wow" timeout={500}>
          <TabContent tab={tab} setAniswitch={setAniswitch}/>
        </CSSTransition>

      </div> 
    )
  }

  function TabContent(props) {

    useEffect(()=>{
      props.setAniswitch(true);
    });

    if (props.tab === 0){
      return <div>0번째 내용입니다.</div>
    } else if (props.tab === 1){
      return <div>1번째 내용입니다.</div>
    } else if (props.tab === 2){
      return <div>2번째 내용입니다.</div>
    }

  }

  function Info(props) {
    return (
      <p>재고 : { props.재고[0] }</p>
    )
  }

  function state를props화(state){
    console.log(state);
    return {
      state : state.reducer, //state라는 이름의 props로 바꿔주세요
      alertOpen : state.reducer2
    }
  }
  
  export default connect(state를props화)(Detail)
