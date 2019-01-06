import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)
  const [invalid, setValid] = useState(false);
	const [vacio, setVacio] = useState(false);
  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
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
							   
							
							 
                 props.updateUser(user.id, user)
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
			<input type="text" name="nombre" value={user.nombre} onChange={handleInputChange} />
			<label>Email</label>
			<input type="text" name="email" value={user.email} onChange={handleInputChange} />
      {invalid ? (<span class="red" >Formato de correo incorrecto</span>) : ''}
			<label>Fecha de Nacimiento</label>
			<input type="text" name="fecha" value={user.fecha} onChange={handleInputChange} />
			<label>Domicilio</label>
			<input type="text" name="domicilio" value={user.domicilio} onChange={handleInputChange} />
      {vacio ? (<div><span class="red" >Ningun campo puede quedar vacio</span><br/></div>) : ''}
			<button>Editar usuario</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancelar
      </button>
    </form>
  )
}

export default EditUserForm
