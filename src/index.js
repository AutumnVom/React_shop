import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

const alertOpen = true;

function reducer2(state = alertOpen, 액션){
  switch(액션.type) {
    case 'alert닫기':
      state = false;
      break;
  }
  return state;
}

const 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '펌프스', quan: 1 },
  { id: 2, name: '스니커즈', quan: 1 }
];

function reducer(state = 초기값, 액션){
  let copy;
  switch(액션.type) {
    case '수량증가':
      copy = [...state];
      copy[액션.payload].quan++;
      break;
    case '수량감소':
      copy = [...state];
      copy[액션.payload].quan--;
      break;
    case '항목추가':
      let found = state.findIndex((a)=>{ return a.id === 액션.payload.id });//조건식이 맞으면 몇번째 있는지 index를 뱉어낸다
      if ( found >= 0 ){
        copy = [...state];
        copy[found].quan++;
      } else {
        copy = [...state];
        copy.push(액션.payload);
        break;
      }
      
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
