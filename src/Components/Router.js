import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "Routes/Home";
import Search from "Routes/Search";
import TV from "Routes/TV";
import Detail from "Routes/Detail";
import Header from "./Header";
import Collection from "Routes/Collection";

// 해당 path에 들어왔을때 보여줄 component를 지정할 수 있다.
// route 는 router 컴포넌트 안에서만 사용할 수 있다.
// BrowserRouter, HashRouter -> 사용하는 API가 다르다. BrowserRouter은 History API, HashRouter은 hash
// exact 를 넣지 않으면 /tv로 시작하는 모든 path에서 랜더링이 이루어진다.
// <redirect from ="*" to ="/"> 뜻 : from에 해당하는 것을 to로 이동
// <Switch> : 하나의 route를 한번에 렌더링 하게끔 해줌.

/*
    위에서 import 한 Router는 Route에게 기본적으로 props를 넘겨줌
    Header.js에서 withRouter을 사용한 것과 다름.

*/
const RouterContainer = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      {/* <Route path="/tv/popular" render={() => <h1>popular</h1>}/> */}
      <Route path="/search" exact component={Search} />
      <Route path="/movie/:id" exact component={Detail} />
      <Route path="/show/:id" exact component={Detail} />
      <Route path="/collections/:id" exact component={Collection} />
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);

export default RouterContainer;
