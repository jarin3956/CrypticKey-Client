import React, { useState, useEffect } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBRange, MDBSwitch } from 'mdb-react-ui-kit';
import './PGInput.scss';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom'


function PGInput() {

    const navigate = useNavigate()

    const [rangeValue, setRangeValue] = useState(6);
    const [numbersSwitch, setNumbersSwitch] = useState(true);
    const [upperCaseSwitch, setUpperCaseSwitch] = useState(true);
    const [lowerCaseSwitch, setLowerCaseSwitch] = useState(true);
    const [specialCharsSwitch, setSpecialCharsSwitch] = useState(false);
    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    };

    const generate = async () => {
        const selectedSwitches = [numbersSwitch, upperCaseSwitch, lowerCaseSwitch, specialCharsSwitch];
        const selectedCount = selectedSwitches.filter((switchValue) => switchValue).length;

        if (rangeValue < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select at least six of length!',
            });
            return;
        }

        if (selectedCount < 2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select at least two options!',
            });
            return;
        }

        const selectedSh = {
            numbers: numbersSwitch,
            upperCase: upperCaseSwitch,
            lowerCase: lowerCaseSwitch,
            specialChars: specialCharsSwitch,
        };

        const requestData = {
            rangeValue,
            selectedSwitches: selectedSh,
        };


        try {
            const response = await fetch('http://localhost:3000/generatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })

            const result = await response.json();

            if (result.password) {
                Swal.fire({
                    title: 'Generated Password',
                    html: `<pre>${result.password}</pre>`,
                    icon: 'success',
                    showCloseButton: true,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'swal-wide',
                    },
                    footer: '<button id="copy-btn">Copy to Clipboard</button>',
                    focusConfirm: false,
                    didOpen: () => {
                        const copyButton = document.getElementById('copy-btn');
                        if (copyButton) {
                            copyButton.addEventListener('click', () => {
                                navigator.clipboard.writeText(result.password);
                                Swal.fire({
                                    title: 'Copied!',
                                    text: 'Password copied to clipboard',
                                    icon: 'success',
                                });
                            });
                        }
                    },
                }).then(() => {
                    navigate('/')
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to generate passwrd. Please try again.',
                });
            }


        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to generate password. Please try again.',
            });
        }
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>
                    <MDBCol col='4' md='6'>
                        <label>Selected Value: {rangeValue}</label>
                        <MDBRange
                            defaultValue={6}
                            min='0'
                            max='30'
                            step='1'
                            id='customRange3'
                            onInput={handleRangeChange}
                        />
                        <br />
                        <MDBSwitch
                            checked={numbersSwitch}
                            onChange={() => setNumbersSwitch(!numbersSwitch)}
                            id='numbersSwitch'
                            label='Numbers (0-9)'
                        />
                        <br />
                        <MDBSwitch
                            checked={upperCaseSwitch}
                            onChange={() => setUpperCaseSwitch(!upperCaseSwitch)}
                            id='upperCaseSwitch'
                            label='Alphabet Upper Case'
                        />
                        <br />
                        <MDBSwitch
                            checked={lowerCaseSwitch}
                            onChange={() => setLowerCaseSwitch(!lowerCaseSwitch)}
                            id='lowerCaseSwitch'
                            label='Alphabet Lower Case'
                        />
                        <br />
                        <MDBSwitch
                            checked={specialCharsSwitch}
                            onChange={() => setSpecialCharsSwitch(!specialCharsSwitch)}
                            id='specialCharsSwitch'
                            label='Special Characters'
                        />
                        <br />

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <MDBBtn className="mb-0 px-5" onClick={generate} size='lg'>Generate</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default PGInput
