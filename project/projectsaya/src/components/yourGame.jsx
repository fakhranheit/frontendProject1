import React, { Component } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl';
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
// import { Button, CustomInput } from 'reactstrap';

class YourGame extends Component {
    state = {
        dataGame: [],
        foto: 'https://i.pinimg.com/originals/7f/6d/06/7f6d06b54982933dda38a6331b0ac6cc.jpg',
        judulgame: '',
        deskripsi: ''
    }

    downloadGame = () => {
        alert('in Development')
    }

    renderfoto = (index) => {
        var dataGame = this.state.dataGame
        this.setState({ foto: APIURLImg + dataGame[index].Foto, judulgame: dataGame[index].namaGame, deskripsi: dataGame[index].deskripsi })
    }

    renderListGame = () => {
        var dataGame = this.state.dataGame
        if (dataGame.length) {
            return dataGame.map((val, index) => {
                return (
                    <div style={{ marginTop: '10px', paddingLeft: '10px' }} onClick={() => { this.renderfoto(index) }} >
                        <div>
                            {val.namaGame}
                        </div>
                    </div>
                )
            })
        }
        return <div style={{ marginLeft: '25px' }}>You Don't have any game yet</div>
    }

    componentDidMount() {
        var iduser = localStorage.getItem('id')
        console.log('idusernya', iduser);

        Axios.get(`${APIURL}user/purchasedgame/${iduser}`)
            .then(res => {
                console.log(res.data);
                this.setState({ dataGame: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        if (this.props.loginstatus === false) {
            return <Redirect to='/notfound' />
        }
        return (
            <div className="container-yourgame">
                <div className='container-list-game'>
                    <div className='container-judul-game'>
                        <div className="judul-game" >
                            Your Game
                        </div>
                    </div>
                    <div className='list-game'>
                        {this.renderListGame()}
                    </div>
                </div>
                <div style={{
                    width: '80%', justifyContent: 'left', borderTopRightRadius: '10px', borderBottomRightRadius: '10px',
                    backgroundImage: `url(${this.state.foto})`, backgroundSize: 'cover',
                    backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
                }}>
                    <div style={{ backgroundColor: '#212121' }}>
                        {this.state.judulgame}
                    </div>
                    {
                        this.state.judulgame !== '' ? (
                            <div>
                                <Button variant='dark' onClick={this.downloadGame} >Download</Button>
                            </div>
                        ) : null
                    }

                    {
                        this.state.judulgame !== '' ? (
                            <div className="deskripsi-game">
                                {this.state.deskripsi}
                            </div>
                        ) : null
                    }
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        iduser: state.auth.id,
        loginstatus: state.auth.loginstatus
    };
};

export default connect(mapStateToProps, {})(YourGame);