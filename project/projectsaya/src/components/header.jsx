import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from "reactstrap";
import { FaSteam } from "react-icons/fa";
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logOut } from "../redux/actions";
import { Link } from "react-router-dom";

const Header = () => {
  const username = useSelector(state => state.auth.username);
  const login = useSelector(state => state.auth.loginstatus);
  const loginerror = useSelector(state => state.auth.loginerror);
  const role = useSelector(state => state.auth.role)
  const dispatch = useDispatch();

  // dropdown
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // dropdown

  // modal
  const [modalbaru, setmodalbaru] = useState(false);
  const toggleLogin = () => setmodalbaru(!modalbaru);
  // modal

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAccount = () => setDropdownOpen(prevState => !prevState);

  //value username
  const [dataLogin, setdataLogin] = useState({
    username: "",
    password: "",
    email: "",
    confirmpass: ""
  });

  const btnLogin = () => {
    dispatch(loginAction(dataLogin.username, dataLogin.password));
  };

  const btnLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    dispatch(logOut());
  };

  const onLoginChange = e => {
    const { name, value } = e.target;
    setdataLogin({ ...dataLogin, [name]: value });
    // console.log(dataLogin);

  };

  return (
    <div style={{ fontFamily: 'Oxanium' }}>
      {/* modal Login */}
      <MDBModal isOpen={modalbaru} toggle={toggleLogin} centered>
        <MDBModalHeader className="text-center warna-modal" titleClass="w-100 font-weight-bold">
          Sign In
        </MDBModalHeader>
        <MDBModalBody>
          <form className="mx-3 grey-text">
            <input onChange={onLoginChange} name="username" placeholder="username" icon="users" group type="text" validate />
            <input onChange={onLoginChange} name="password" placeholder="password" icon="unlock" group type="password" validate error="wrong" success="right" />
          </form>
        </MDBModalBody>
        <div>
          {loginerror === "error" ? <p className="alert alert-danger">username atau password salah</p> : null}
        </div>
        <MDBModalFooter className="justify-content-center">
          <button onClick={btnLogin} className="btn btn-dark">
            Login
          </button>
        </MDBModalFooter>

      </MDBModal>
      {/* modal login */}

      <div className="div-header">
        <Navbar color="dark" dark expand="md">
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto d-flex" navbar>
              <UncontrolledDropdown >
                <DropdownToggle nav>
                  <FaSteam data-toggle="tooltip" data-placement="right" title="click for more menu" />
                </DropdownToggle>
                <DropdownMenu bottom>
                  <DropdownItem>
                    <NavLink >
                      <Link to='/'>
                        Home
                      </Link>
                    </NavLink>
                  </DropdownItem>
                  {login === false ? (
                    <DropdownItem>
                      <NavLink onClick={toggleLogin} style={{ marginLeft: '10px' }}>Login</NavLink>
                    </DropdownItem>
                  ) : null}
                  <DropdownItem>
                    <NavLink href="/register" style={{ marginLeft: '10px' }}>Register</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink>
                  <Link to='/storedisplay' style={{ color: 'white' }}>
                    Store
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                  <Link to='/' style={{ color: 'white' }}>
                    Community
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">About</NavLink>
              </NavItem>
              {login === true ? (
                <Dropdown style={{ marginLeft: "180vh", position: 'absolute' }} isOpen={dropdownOpen} toggle={toggleAccount}>
                  <DropdownToggle nav>
                    Hello, {username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {
                      role === 'user' ? (
                        <div>
                          <DropdownItem style={{ marginBottom: '10px' }}>
                            <Link>Profile</Link>
                          </DropdownItem>
                          <DropdownItem style={{ marginBottom: '10px' }}>
                            <Link to="/cart">Cart</Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link to="/payment">Payment</Link>
                          </DropdownItem>
                        </div>
                      ) : null

                    }
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to='/' onClick={btnLogout}>Log out</Link >
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : null}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
