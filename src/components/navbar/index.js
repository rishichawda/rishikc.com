import React, { Component } from 'react';
import './index.scss';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <ul className="navbar-links">
                    <li>About</li>
                    <li>Skills</li>
                    <li>Works</li>
                    <li>Other stuff</li>
                    <li>Some more</li>
                </ul>
            </div>
        );
    }
}

export default Navbar;
