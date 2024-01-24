import React, { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';

function SaveInput() {

    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name.length < 4 || password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Name should be at least 4 characters and password should be at least 6 characters.',
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/savePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password saved successfully!',
                }).then(() => {
                    navigate('/')
                })

            } else {
                const errorMessage = await response.text();
                if (response.status === 403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Password with the same name already exists.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Failed to save password. ${errorMessage}`,
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to save password. Please try again.',
            });
        }
    };

    return (
        <form style={{ width: '300px' }} onSubmit={handleSubmit}>
            <h3 className='text-center'>Save Password</h3>
            <MDBInput
                className='mb-4'
                type='text'
                id='form1Example1'
                label='Password Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <MDBInput
                className='mb-4'
                type='password'
                id='form1Example2'
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn type='submit' block>
                Save
            </MDBBtn>
        </form>
    );
}

export default SaveInput;
