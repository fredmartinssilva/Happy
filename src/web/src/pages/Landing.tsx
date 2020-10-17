import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';

function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="happy"></img>

                <main>
                <h1>Leve felicidade para o mundo</h1>
                <p>Leve felicidade para o mundo</p>

                <div className="location">
                    <strong>Uberaba</strong>
                    <span>Minas Gerais</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)"></FiArrowRight>
                </Link>
                </main>
            </div>
        </div>
    );
}

export default Landing;