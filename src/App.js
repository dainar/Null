import React, { useState, Fragment } from 'react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import UserTable from './tables/UserTable';

const App = () => {
	
	const usersData = [
		{ id: 1, nombre: 'Gorge', email: 'george@mail.com', fecha: '01/06/2018', domicilio: 'https://www.google.com/maps/search/?api=1&query=Selva+45%2C+insugentes+cuilcuilco' },
		{ id: 2, nombre: 'Raul', email: 'raul@mail.com', fecha: '01/06/2018', domicilio: 'https://www.google.com/maps/search/?api=1&query=Selva+45%2C+insugentes+cuilcuilco' },
		{ id: 3, nombre: 'Sergio', email: 'serch@mail.com', fecha: '01/06/2018', domicilio: 'https://www.google.com/maps/search/?api=1&query=Selva+45%2C+insugentes+cuilcuilco' },
	];

	const initialFormState = { id: null, nombre: '', email: '', fecha:'', domicilio:'' };

	const [ users, setUsers ] = useState(usersData);
	const [ currentUser, setCurrentUser ] = useState(initialFormState);
	const [ editing, setEditing ] = useState(false);

	const addUser = user => {
		user.id = users.length + 1
		setUsers([ ...users, user ])
	};

	const deleteUser = id => {
		setEditing(false)

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
