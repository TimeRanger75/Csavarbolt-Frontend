import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State{
  Csavarok:Csavar[];
  regTipus:string;
  regHossz:number;
  regKeszlet:number;
  regAr:number;
}

interface Csavar{
  id:number;
  tipus:string;
  hossz:number;
  keszlet:number;
  ar:number;
}


// interface CsavarResponse{
//   Csavarok:Csavar[];
// }

class App extends Component<{}, State>{
  constructor(props:{}){
    super(props)

    this.state={
      Csavarok:[],
      regTipus:'',
      regHossz:0,
      regKeszlet:0, 
      regAr:0.00
    }
  }

  async loadCsavarok(){
    let response=await fetch('http://localhost:3000/csavar')
    let data=await response.json();
    this.setState({
      Csavarok:data
      
    });
  }

  componentDidMount(){
      this.loadCsavarok();
     
  }


  render(){
    const{regTipus, regHossz, regAr, regKeszlet}=this.state;
      return <div>
        <div className='container'>
        <div className='row'>
        {
          this.state.Csavarok.map(Csavar=><div className='col-12 col-sm-4'><h2>{Csavar.tipus}<ul><li>Hossz: {Csavar.hossz}mm</li> <li>Készleten: {Csavar.keszlet}</li> <li>Ár: {Csavar.ar}Ft/db</li></ul></h2></div> )
        }
      </div>
      </div>

      </div>
  }

}

export default App;
