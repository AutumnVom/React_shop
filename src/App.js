import React, { useState, useContext } from 'react';
import './App.css';
import { Navbar, Container, Figure, Nav } from 'react-bootstrap';
import Data from './data.js';
import Detail from './Detail.js';
import Cart from './Cart.js';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const 재고context = React.createContext();

function App() {

  const [shoes, setShoes] = useState(Data);
  const [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ShoesShop
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/detail/0">Detail</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Switch>

        <Route exact path="/">
          <Figure className="background">
            <Figure.Image
              width={1000}
              height={500}
            />
            <Figure.Caption className="caption">
              20% Season Off
            </Figure.Caption>
          </Figure>

          <div className="container">

            <재고context.Provider value={재고}>

              <div className="row">
                {
                  shoes.map( (value, index) => {
                    return (
                      <Card key={index} shoes={shoes[index]} index={index}/>
                    )
                  })
                }
                {/* <Card shoes={shoes[0]}/>
                <Card shoes={shoes[1]}/>
                <Card shoes={shoes[2]}/> */}
              </div>

            </재고context.Provider>

            <button className="btn btn-primary" onClick={()=>{

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{
                //로딩중이라는 UI 숨김
                console.log(result.data);
                setShoes( [...shoes, ...result.data] );

              })//성공시
              .catch(()=>{
                //로딩중이라는 UI 숨김
                console.log('실패했어요')
              })//실패시

            }}>더보기</button>
          </div>
        </Route>

        <Route path="/detail/:id">

          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </재고context.Provider>

        </Route>
        {/* <Route path="/어쩌구" component={Modal}></Route> */}

        <Route path="/cart">
          <Cart/>
        </Route>


        <Route path="/:id">
          <div>아무거나 적었을때 이거 보여주셈</div>
        </Route>

      </Switch>

      
      

    </div>
  );
}


function Card(props) {

  const 재고 = useContext(재고context);
  const history = useHistory();

  const { title, content, price } = props.shoes;
  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.shoes.id) }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.index + 1) + '.jpg'} width="100%" />
      <h4>{ title }</h4>
      <p>{ content } & { price } 원</p>
      {재고[props.index]}
      {/* <Test/> */}
    </div>
  )
}

function Test() {
  const 재고 = useContext(재고context);
  return <p>{재고[0]}</p>
}

function Loading() {
  return (
    <div className="loading">
      <p>로딩중 입니다.</p>
    </div>
  )
}
export default App;
