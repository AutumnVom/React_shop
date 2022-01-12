import React from 'react';
import { Table } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {

  const state = useSelector((state) => state);
  console.log(state);
  const dispatch = useDispatch();

  return (
    <div>
      <Table className="mt-4" responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>

          {
            state.reducer.map((a, i)=>{
              return (
                <tr key={i}>
                  <td>{ a.id }</td>
                  <td>{ a.name }</td>
                  <td>{ a.quan }</td>
                  <td>
                    <button onClick={ ()=>{ dispatch({ type: '수량증가', payload: a.id }) } }>+</button>
                    <button onClick={ ()=>{ dispatch({ type: '수량감소', payload: a.id }) } }>-</button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </Table>

      {
        state.reducer2 === true
        ? <div className="my-alert2">
            <p>지금 구매하시면 신규 할인 20%</p>
            <buttom onClick={ ()=>{ dispatch({type: 'alert닫기'}) } }>닫기</buttom>
          </div>
        : null
      }
      
    </div>
  )
}

// function state를props화(state){
//   console.log(state);
//   return {
//     state : state.reducer, //state라는 이름의 props로 바꿔주세요
//     alertOpen : state.reducer2
//   }
// }

// export default connect(state를props화)(Cart);

export default Cart;
