import React, { Component } from 'react';
import './index.scss';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar-links">
                    <span>About</span>
                    <span>Skills</span>
                    <span>Works</span>
                </div>
            </div>
        );
    }
}

export default Navbar;
