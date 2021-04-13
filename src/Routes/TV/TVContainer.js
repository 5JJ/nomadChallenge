import React from "react";
import TVPresetner from "./TVPresenter";
import { tvApi } from "api";

export default class extends React.Component{
    state = {
        topRated: null,
        airingToday: null,
        popular: null,
        error: null,
        loading: true,
    }

    async componentDidMount(){
        try{
            const {data: {results: topRated}} = await tvApi.topRated();
            const {data: {results: popular}} = await tvApi.popular();
            const {data: {results: airingToday}} = await tvApi.airlingToday();
            
            this.setState({
                topRated,
                popular,
                airingToday
            })

        }catch(error){
            this.setState({error: "Can't find TV Information"})
        }finally{
            this.setState({loading: false})
        }
    }
    
    render(){
        const {airingToday, popular, topRated, error, loading} = this.state;
        
        return (
            <TVPresetner 
                airingToday={airingToday} 
                popular={popular}
                topRated={topRated}
                error={error}
                loading={loading}
            />
        )
    }
}