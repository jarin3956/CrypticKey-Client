import React, { useEffect, useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function Cards() {
    const [passwordData, setPasswordData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const cardsPerPage = 6;

    const findData = async () => {
        try {
            const response = await fetch('http://localhost:3000/getPassword');
            if (response.status === 200) {
                const data = await response.json();
                data.pass.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPasswordData(data.pass);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cannot find passwords',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Cannot find passwords',
            });
        }
    };

    useEffect(() => {
        findData();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            title: 'Copied!',
            text: 'Password copied to clipboard',
            icon: 'success',
        });
    };

    const indexOfLastCard = showAll ? passwordData.length : currentPage * cardsPerPage;
    const currentCards = passwordData.slice(0, indexOfLastCard);

    const renderCards = () => {
        return currentCards.map((pass, i) => (
            <MDBCol key={i} sm='6'>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Name : {pass.name}</MDBCardTitle>
                        <MDBCardText>Password : {pass.password}</MDBCardText>
                        <MDBBtn onClick={() => copyToClipboard(pass.password)}>
                            Copy to Clipboard
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        ));
    };

    const handleShowMore = () => {
        setShowAll(true);
    };

    const handleShowLess = () => {
        setShowAll(false);
        setCurrentPage(1); 
    };

    return (
        <>
            <MDBRow>{renderCards()}</MDBRow>
            {passwordData.length > cardsPerPage && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ padding: '30px' }}>
                        {showAll ? (
                            <MDBBtn onClick={handleShowLess}>Show Less</MDBBtn>
                        ) : (
                            <MDBBtn onClick={handleShowMore}>Show More</MDBBtn>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Cards;
