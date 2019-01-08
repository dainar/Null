import React, { useState } from 'react';



const AddUserForm = props => {
	const initialFormState = { id: null, nombre: '', email: '', fecha: new Date(), domicilio:'' }
	const [ user, setUser ] = useState(initialFormState)
	const [invalid, setValid] = useState(false);
	const [vacio, setVacio] = useState(false);
	const handleInputChange = (event) => {
		
		const { name, value } = event.target;

		   
		setUser({ ...user, [name]: value })
		
	}



	return (
		<form
			onSubmit={event => {
				
				event.preventDefault()
				console.log(user.nombre);
				
				console.log('hola')
				const validateEmail = (email) => {
					const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					const result = regexp.test(email);
					if(result===true){
						setValid(false);
						if (user.nombre ==='' || user.email === '' || user.fecha === '' || user.domicilio === ''){
							setVacio(true);
							return} 
							else{
								setVacio(false);
							}
						let string= user.domicilio;
						const findAndReplace = ( string, target, replacement) => {
							console.log('hola');

								let i = 0;
								
								for (i; i < string.length; i++) {
								
								  string = string.replace(target, replacement);
								
								}
								
								return string;
								
							   }
							   let newstr = (findAndReplace(string, " ", "+"));
							   
							   user.domicilio = 'https://www.google.com/maps/search/?api=1&query='+(findAndReplace(newstr, ",", "%2C")+'');
							   
							
							 
				  props.addUser(user)
				  setUser(initialFormState)
					  } else{
						  console.log('bye');
						setValid(true);
						return false;
					
					  }
					
				  }
			validateEmail(user.email);
			
			}}
		>
			<label>Nombre</label>
			<input type="text" name="nombre" value={user.nombre} onChange={handleInputChange} placeholder="Adrian"/>
			<label>Email</label>
			<input type="text" name="email" value={user.email} onChange={handleInputChange} placeholder="ejemplo@ejemplo.com"/>
			{invalid ? (<span class="red" >Formato de correo incorrecto</span>) : ''}
			<label>Fecha de Nacimiento</label>
			<input type="date" name="fecha" value={user.fecha} onChange={handleInputChange} />
			<label>Domicilio</label>
			<input type="text" name="domicilio" value={user.domicilio} onChange={handleInputChange} placeholder="calle, colonia, codigo postal, ciudad"/>
			{vacio ? (<div><span class="red" >Ningun campo puede quedar vacio</span><br/></div>) : ''}
			<button>Añade un usuario</button>
		</form>
	)
}

export default AddUserForm;
