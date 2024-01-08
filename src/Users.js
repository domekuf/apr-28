import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import UserList from './UserList';

function Users() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`https://5settembre.it/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [id]);
  return (<UserList userList={users} />);
}

export default Users;