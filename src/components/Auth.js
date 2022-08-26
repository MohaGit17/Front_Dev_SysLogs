import React,{useState, useEffect} from 'react';
import App from '../App';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Products } from './Securite/table';
import { SwitchTable } from './Reesau/SwitchTable';
import Picture from './immobilier-entreprise-nice.jpg'

function Principale() {
  const [togsState, setTogsState] = useState(0);
  const [test3Mail,settest3Mail]=useState();
  
  useEffect(() => {
    let m =JSON.parse(window.localStorage.getItem('connectState'));
    if (m) {
      setTogsState(m);
    }
   },[togsState]);

   function Vide(){
    window.localStorage.setItem("connectState",JSON.stringify(0));
    setTogsState(0);
   }
    async function DisplayValue()  {
        console.log(test3Mail);
        let item={test3Mail};
        let result = await fetch("http://127.0.0.1:5000/get_group", {
          method : "POST",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          body:JSON.stringify(item)
        })
        result = await result.json(); 
        if(parseInt(result.group)===4){
          setTogsState(0);
          window.alert("Mail incorrect")
        }else{
          setTogsState(parseInt(result.group));
          window.localStorage.setItem("connectState",JSON.stringify(parseInt(result.group)));
        }
        
    }


  return (
      <>
        
        <div style={{textAlign:"center"}} className="content-tabs" >
          <div style={{textAlign:"center"}} className={togsState === 0 ? "content  active-content" : "content"}>
           <div className="card" style={{width: "20rem",margin:'auto'}}>
            <input type="image" className="card-img-top" src={Picture} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Welcome :</h5>
              <input type="text" className="form-control" aria-label="Default" onChange={(event)=>{settest3Mail(event.target.value) }} placeholder="Enter your Mail" required></input>
              <br />
              <button onClick={DisplayValue} className="btn btn-primary">Connexion</button>
            </div>
           </div>
          </div>
          <div  className={togsState === 1 ? "content  active-content" : "content"}><button style={{float:'right'}} onClick={Vide} className="btn btn-primary">Quitter</button> <br /><Products /></div>
          <div className={togsState === 2 ? "content  active-content" : "content"}><button style={{float:'right'}} onClick={Vide} className="btn btn-primary">Quitter</button><br /><SwitchTable /></div>
          <div className={togsState === 3 ? "content  active-content" : "content"}><button style={{float:'right'}} onClick={Vide} className="btn btn-primary">Quitter</button><App /></div>
        </div>
      </>
  );  
}

export default Principale;