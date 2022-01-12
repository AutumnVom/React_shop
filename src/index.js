import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

const alertOpen = true;

function reducer2(state = alertOpen, action){
  switch(action.type) {
    case 'alert닫기':
      state = false;
      break;
  }
  return state;
}

const 초기값 = [
  { id: 0, name: 'White and Black', quan: 1 },
  { id: 1, name: 'Red Knit', quan: 1 },
];

function reducer(state = 초기값, action){
  let copy;
  const payload = action.payload;

  switch(action.type) {
    case '수량증가':
      copy = [...state];
      copy[payload.id].quan++;
      break;

    case '수량감소':
      state[payload.id].quan == 1
      ? alert('최소 수량은 1입니다.')
      : copy = [...state];
        copy[payload.id].quan--;
        break;

    case '항목추가':
      const found = state.findIndex((a)=>{ return a.id === payload.id });
      console.log(found);
      if ( found >= 0 ) {
        copy = [...state];
        copy[found].quan++;
      } else {
        copy = [...state];
        copy.push({
          ...payload,
          id: state.length
        });
      }
      break;

    default:
      copy = state;
      break;
  }
  return copy;
}

const store = createStore(combineReducers( {reducer, reducer2} ));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
