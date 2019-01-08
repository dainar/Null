import React, { useState, Fragment } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import UserTable from './tables/UserTable';

const App = () => {
	
	const usersData = [
		{ id: 1, nombre: 'Tania', email: 'agkorn@kmail.com' , fecha:'01/01/2018', direccion:'s'},
		{ id: 2, nombre: 'Craig', email: 'agkorn@kmail.com' , fecha:'01/01/2018', direccion:'s' },
		{ id: 3, nombre: 'Ben', email: 'agkorn@kmail.com' , fecha:'01/01/2018', direccion:'s'},
]

	const initialFormState = { id: null, nombre: '', email: '', fecha:'', domicilio:'' };

	const [ users, setUsers ] = useState(usersData);
	const [ currentUser, setCurrentUser ] = useState(initialFormState);
	const [ editing, setEditing ] = useState(false);

  

	const addUser = user => {
		user.id = Object.keys(users).length + 1;
		
	
		
		setUsers([...users, user]);
		window.localStorage.setItem("myData",JSON.stringify([...users, user]));
	
	};

	const deleteUser = id => {
		setEditing(false)
		var duser = JSON.parse(localStorage["myData"]);
		console.log(duser);
  for (var i = 0; i < duser.length; i++) {
     if(duser[i].id == id){
	const mydel = duser.splice(i,1);
	console.log(mydel);
	var myData = JSON.stringify(duser);
	console.log(duser);
	window.localStorage.setItem("myData", myData);
     }
  }
  
 
		setUsers(users.filter(user => user.id !== id))
	};

	const updateUser = (id, updatedUser) => {
		setEditing(false)

		setUsers(users.map(user => (user.id === id ? updatedUser : user)))
	};

	const editRow = user => {
		setEditing(true)

		setCurrentUser({ id: user.id, nombre: user.nombre, email: user.email, fecha: user.fecha, domicilio: user.domicilio})
	};

	return (
		<div className="container">
			<h1>APP Prueba Nulldata</h1>
			<div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Editar Usario</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Añadir usuario</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>Ver Usuario</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
		</div>
	)
};

export default App;
