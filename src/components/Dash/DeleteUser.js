import React from 'react';
import { useParams } from 'react-router-dom';



import { Link } from "react-router-dom";
import {

    Button
} from "reactstrap";

export const DeleteUser = (props) => {

    let { umail } = useParams()
    async function DisplayValue() {
        console.log("Delte MAIL :  " + umail)
        let item={umail}
        let result = await fetch("http://127.0.0.1:5000/delete_usergroup", {
          method : "POST",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          body:JSON.stringify(item)
        })
        console.log(result)
    }
    return (

        <div style={{width:"600px" ,height:"300px"}} className="card text-center">
            <div className="card-header">
                Warning
            </div>
            <div style={{position:"absolute",top: "35%"}} className="card-body">
                <h5 className="card-title">Voulez vous vraiment supprimer ce profile de façon permanente</h5>
                <Link to="/">
                    <Button onClick={DisplayValue} className="btn btn-danger ml-2">Delete</Button>
                </Link>&nbsp;&nbsp;
                <Link to="/" className="btn btn-primary" >Cancel</Link>   
            </div>
        </div>

  )
}