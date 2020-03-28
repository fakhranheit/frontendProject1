import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import { Zoom } from 'react-reveal'



class JumbotronStore extends Component {
    state = {}
    render() {
        return (
            <div style={{ paddingLeft: '100px', paddingRight: '100px', paddingTop: '50px', fontFamily: 'Oxanium', color: 'white' }}>
                <Zoom>
                    <Jumbotron fluid style={{
                        backgroundColor: '#343a40', borderRadius: '10px',
                        backgroundImage: `url(https://i.pinimg.com/originals/7f/6d/06/7f6d06b54982933dda38a6331b0ac6cc.jpg)`, backgroundSize: 'cover',
                        backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
                    }} >
                        <Container>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h1 style={{ marginTop: '400px' }}>This is our time, this is our Arena</h1>
                            </div>
                        </Container>
                    </Jumbotron>
                </Zoom>
            </div>
        );
    }
}

export default JumbotronStore;