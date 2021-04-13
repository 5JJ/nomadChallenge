import HomeContainer from "./HomeContainer";

export default HomeContainer;




/*
    Pattern of coding React Components
     
    "Container Presenter Pattern"

    - Container : data를 가지고 state를 가지고 api를 불러옴 -> 모든 로직을 처리 (Data 담당)
    - Presenter : show the data. doesnt have state. (Style 담당) 함수형 컴포넌트

    각 라우트 별로 index.js, Container, Presenter을 만들어 준다.
    index.js는 Container을 내보내는 역할만 한다.


    > index.js 를 만드는 이유 
        Node는 폴더 자체를 import 했을때 index.js를 먼저 찾기 때문이다.

*/