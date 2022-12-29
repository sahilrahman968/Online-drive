import React,{Component} from "react"
import error from "../assets/errorBoundary.png"

export default class ErrorBoundary extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       hasError : false
    }
  }

  static getDerivedStateFromError(){
    return {hasError : true}
  }

  componentDidCatch(err){
    console.log(err)
  }

  render(){
    if(this.state.hasError)
        return <div style={{position:"fixed", top:"0", bottom:"0" , right:"0", left:"0", display:"flex", alignItems:"center", justifyContent:"center", zIndex:"99", opacity:"0.6"}}>
            <img style={{height:"400px", width:"500px"}} src={error} alt="error"/>
        </div>
    else
        return this.props.children    
  }
}