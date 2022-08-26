import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const AddUser = () => {
  const [umail,setumail]=useState();
  const [ugrp,setugrp]=useState();
 
  async function DisplayValue(){

    console.log("ADD MAIL :  "+umail+"  Grrp   "+ugrp)
    let item={umail,ugrp}
    let result = await fetch("http://127.0.0.1:5000/insert_usergroup", {
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
    <Form style={{textAlign:"center"}}>
      <FormGroup>
        <Label>Mail</Label>
        <Input type="text" onChange={(event)=>{setumail(event.target.value) }} placeholder="Enter Mail" required></Input>
        <Label>Group</Label>
        <Input type="text" onChange={(event)=>{setugrp(event.target.value) }}  placeholder="Enter Groupe: adm ... sec ... res" required></Input>
      </FormGroup>
      <Link to ="/">
        <Button  onClick={DisplayValue} className="btn btn-success">Add</Button>
      </Link>
      &nbsp;&nbsp;
      <Link to ="/"  className="btn btn-primary">Cancel</Link>
    </Form>
  )
}