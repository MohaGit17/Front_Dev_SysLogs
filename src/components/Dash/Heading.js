import React from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Container
} from "reactstrap";

const style= {
  width: "70%",
  border:"solid 5px black",
  backgroundColor:"black",
  borderRadius:"5px",
  margin:'auto'
}

export const Heading = () => {
  return (
    <Navbar style={style}>
      <Container style={{backgroundColor:"black",}}>
        <NavbarBrand style={{  cursor: "pointer",float:"left",backgroundColor:"black",color:"white"}} href="/">My Team</NavbarBrand>
        <Nav style={{backgroundColor:"black",}}>
          <NavItem style={{position: "absolute",right: "20px",float:"right",backgroundColor:"black"}}>
            <Link  styele={{position: "absolute",right: "20px",}} className="btn btn-primary" to="/add">Add User</Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}