import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import {
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
export function UserList(props) {

  const [users, setusers] = useState([]);

  const fetchusers = async () => {
    const response = await axios
      .get("http://127.0.0.1:5000/get_all_usergroup")
      .catch((err) => console.log(err));

    if (response) {
      const users = response.data;
      setusers(users);
      
    }
  };

 
  const style= {
    width: "70%",
    margin:'auto',
  }
  
  useEffect(() => {
    fetchusers();
  }, []);
  

  return (
    <ListGroup style={style} className="mt-4">
        <>          
        {users.length > 0 ? (
        <>
          {users.map(user => (
            <ListGroupItem className="d-flex" key={user.user}>
              <strong>{user.user}</strong>
              <strong style={{position: "absolute",left: "500px",}}>{user.group}</strong>
              <div className="ml-auto">
                <Link to={`/edit/${user.user}`} style={{position: "absolute",right: "90px",bottom:"1px"}} color="warning" className="btn btn-warning mr-1">Edit</Link>&nbsp;&nbsp;
                <Link to={`/delete/${user.user}`} style={{position: "absolute",right: "10px",bottom:"1px"}} className="btn btn-danger mr-1">Delete</Link>                       
              </div>
            </ListGroupItem>
          ))}
        </>
      ) : (
          <h4 className="text-center">No Users</h4>
        )}         
        </>  
    </ListGroup>
  )
}