import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'
import { Link } from 'react-router-dom'

class CardStore extends Component {
    state = {
        dataGame: [],
    }

    renderProduk = () => {
        var dataGame = this.state.dataGame
        return dataGame.map((val) => {
            return (
                <div className="img-hover-zoom">
                    <Link to={"/detailstore/" + val.id}>
                        <div className="card text-white" style={{ padding: '10px', backgroundColor: '#1b2838', fontFamily: 'Oxanium' }}>
                            <img className="card-img " src={`${APIURLImg + val.foto}`} alt="" style={{ width: '300px', height: '200px' }} />
                            <div className="card-img-overlay" >
                                <div style={{ marginTop: '105px' }}>
                                    <div className="card-title" >{val.namaGame}</div>
                                    <p className="card-text">{val.namaGenre}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })
    }

    componentDidMount() {
        Axios.get(`${APIURL}game/getgame`)
            .then(res1 => {
                console.log('get game', res1.data)
                this.setState({ dataGame: res1.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <h1 style={{ fontFamily: 'Oxanium', color: 'white', display: 'flex', justifyContent: 'center', paddingTop: '60px' }}>All Games</h1>
                <div className="box-card-store row ">
                    {this.renderProduk()}
                </div>
            </div>

        );
    }
}

export default CardStore;