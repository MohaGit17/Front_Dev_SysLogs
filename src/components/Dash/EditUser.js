 import React, { useState } from 'react';
 import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const EditUser = (props) => {
  const [newmail,setnewmail]=useState();
  const [newgrp,setnewgrp]=useState();
  const { umail } = useParams()
  async function DisplayValue(){
    console.log("Edit MAIL :  "+umail+" to "+newmail+"  Group "+newgrp)
    let item={umail,newmail,newgrp}
    let result = await fetch("http://127.0.0.1:5000/update_usergroup", {
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
    <Form style={{textAlign:"center"}} >
      <FormGroup>
        <Label>Mail</Label>
        <Input type="text" onChange={(event)=>{setnewmail(event.target.value) }} placeholder="Enter New Mail" required></Input>
        <Label>Group</Label>
        <Input type="text" onChange={(event)=>{setnewgrp(event.target.value) }}  placeholder="Enter New Groupe: adm ... sec ... res" required></Input>
      </FormGroup>
      <Link to ="/">
        <Button  onClick={DisplayValue} className="btn btn-warning mr-1">Edit</Button>
      </Link>
      &nbsp;&nbsp;
      <Link to ="/"  className="btn btn-primary">Cancel</Link>
    </Form>
  )
}