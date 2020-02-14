import React,{ Component } from 'react';
class Navbar extends Component {
    render (){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand col-sm-3 col-md-2 mr-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nateg's Blockchain Parking
              </a>
              <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                the address account is 
              </a>
              <ul className="navbar-nav px-3">
              <li className="l1">
              <small ><span id="account">{this.props.account}</span></small></li></ul>
            </nav>
        );
    }
}
export default Navbar;