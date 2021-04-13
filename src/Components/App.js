import React from 'react';
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";
// Components/Header directory 를 먼저 들려서 index.js가 있으면 그것을 확인해본다.

// 하나의 componet만 rendering 해야하는데 <></>(fragments)를 사용하면 여러 
// 컴포넌트를 묶어서 렌더링할 수 있다.
function App() {
  return (
    <>
    <Router />
    <GlobalStyles />
    </>
  );
}

export default App;
