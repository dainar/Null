import React, {useState,useEffect} from 'react'
import moment from 'moment';




const UserTable = props => {

  const [ userss, setUserss ] = useState({});
  useEffect(() => {
    console.log(props.users);
    const usersss = window.localStorage.getItem('myData');
    
      const myObj= JSON.parse(usersss);
      
      console.log(myObj);
     if(myObj == null){setUserss(props.users)}else{
      setUserss(myObj);
    
    }
    
    
    
    
    }, [props]);
 
  
 

  
  
  return (
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Fecha</th>
        <th>Domicilio</th>
        <th>Aciones</th>
      </tr>
    </thead>
    <tbody>
      {userss.length > 0 ? (
        userss.map(user => (
          <tr key={user.id}>
            <td>{user.nombre}</td>
            <td>{user.email}</td>
            <td>{moment(user.fecha).format("DD/MM/YYYY")}</td>
            <td><a href={user.domicilio}>Direccion</a></td>
            <td>
              <button
                onClick={() => {
                  props.editRow(user)
                }}
                className="button muted-button"
              >
                Editar
              </button>
              <button
                onClick={() => props.deleteUser(user.id)}
                className="button muted-button"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>No hay usuarios</td>
        </tr>
      )}
    </tbody>
  </table>

);
      }

export default UserTable
