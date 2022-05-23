import React from 'react';
import Header from '../components/header/Header';
import Home from '../components/home/Home';
import Footer from '../components/footer/Footer';
import './Home.scss';

const HomePage = () => {
    return (
        <div>
            <Header />
            <div className='container1'>
                <Home />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;