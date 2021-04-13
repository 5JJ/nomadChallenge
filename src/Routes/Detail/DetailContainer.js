import React from "react";
import DetailPresenter from './DetailPresenter';
import {moviesApi, tvApi} from "api";

export default class extends React.Component{
    constructor(props){
        super(props);
        const {location: {pathname}} = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        }
    }
    // props로 state를 변경시키고 싶을때
    // return 이 null 이 아니면 setState가 발생함
    // getDerivedStateFromProps(){

    // }

    async componentDidMount(){
        const {match : 
            {
                params: {id}
            },
            history,
            
        } = this.props
        // update 해주지 않을 거면 이처럼 선언해 줄 수 있다.
        //this.isMovie = this.props.pahtname.includes("/movie/")
        const {isMovie} = this.state
        const parsedId = Number(id)
        if(isNaN(parsedId)){
            return history.push('/');
        }
        let result = null;
        try{
            if(isMovie){
                ({data: result} = await moviesApi.movieDetail(parsedId));
            }else{
                ({data: result} = await tvApi.showDetail(parsedId));
            }
            
        }catch(error){
            this.setState({error: "Can't find the page"})
        }finally{
            this.setState({loading: false, result})
        }    
    }

    render(){
        const {result, error, loading} = this.state;
        console.log(result)
        return (
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
            />
        )
    }
}