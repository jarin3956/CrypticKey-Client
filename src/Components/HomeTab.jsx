import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeTab.scss';

function HomeTab() {
    const navigate = useNavigate();
    const handleGenerate = () => {
        navigate('/generate')
    }
    const handleSave = () => {
        navigate('/save')
    }
    const handleShowSaved = () => {
        navigate('/saved')
    }
    return (

        <div className="home-container">
            <div className="home-tab" >
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4  ad-cards">
                    <div className="ad-card red" onClick={handleGenerate}>
                        <p className="tip" >Generate Password</p>
                    </div>
                    <div className="ad-card blue">
                        <p className="tip" onClick={handleSave} >Save Password</p>
                    </div>
                    <div className="ad-card green">
                        <p className="tip" onClick={handleShowSaved} >Show Passwords</p>
                    </div>
                </div>
            </div>
            <img
                src="images/homeimg.webp"
                className='img-fluid'
                style={{ height: '92vh', width: '100%' }}
                alt="hai"
            />
        </div>


    )
}

export default HomeTab