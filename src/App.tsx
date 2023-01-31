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

  registerHandler=async()=>{
    const{regTipus, regHossz, regAr, regKeszlet}=this.state;

    const data={
      tipus:regTipus,
      hossz:regHossz,
      keszlet:regKeszlet,
      ar:regAr
    };
    let response=await fetch('http://localhost:3000/csavar',{method:'POST', headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});

    this.setState({
      regTipus:'',
      regHossz:0,
      regKeszlet:0,
      regAr:0.00
    })
    await this.loadCsavarok();
  };

deleteHandler=async(id:number)=>{
  await fetch('http://localhost:3000/csavar/'+id,{method:'DELETE'});
  this.loadCsavarok();
}

  render(){
    const{regTipus, regHossz, regAr, regKeszlet}=this.state;
      return <div>
         <h1>Új csavar felvétele</h1>
        Csavar típusa: <br /> <input type="text"  value={regTipus} onChange={e=>this.setState({regTipus:e.currentTarget.value})} required/> <br /> 
        Csavar hossza: <br /> <input type="number" value={regHossz} onChange={e=>this.setState({regHossz:parseInt(e.currentTarget.value)})}/> <br />
        Készleten: <br /> <input type="number" value={regKeszlet} onChange={e=>this.setState({regKeszlet:parseInt(e.currentTarget.value)})}/> <br />
        Csavar ára: <br /> <input type="number" value={regAr} onChange={e=>this.setState({regAr:parseFloat(e.currentTarget.value)})}/> <br />
        <button onClick={this.registerHandler} className="btn btn-primary" style={{marginBottom:10, marginTop:10}}>Felvesz</button>
        <div className='container'>
        <div className='row'>
        {
          this.state.Csavarok.map(Csavar=><div className='col-12 col-sm-4'><h2>{Csavar.tipus}<ul><li>Hossz: {Csavar.hossz}mm</li> <li>Készleten: {Csavar.keszlet}</li> <li>Ár: {Csavar.ar}Ft/db</li> <button onClick={(event)=>this.deleteHandler(Csavar.id)}>Törlés</button></ul></h2></div> )
        }
      </div>
      </div>

      </div>
  }
}

//A törlés és felvétel gomb változásai csak az oldal újratöltése után jelennek meg

export default App;
