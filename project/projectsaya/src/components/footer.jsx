import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
    return (
        <MDBFooter color="#161f2d" className="font-small pt-4 mt-4">
            <div className="footer-copyright text-center py-3" style={{ backgroundColor: '#212121' }}>
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/fakhranheit"> https://github.com/fakhranheit</a>
                </MDBContainer>
            </div>
        </MDBFooter >
    );
}

export default Footer;