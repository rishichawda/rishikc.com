import React, { Component } from 'react';
import './index.scss';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <ul className="navbar-links">
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                    <li>Link 4</li>
                    <li>Link 5</li>
                </ul>
            </div>
        );
    }
}

export default Navbar;
