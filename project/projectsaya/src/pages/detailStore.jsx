import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'
import { Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format'

class DetailStore extends Component {
    state = {
        detailgame: []
    }

    onAddtoCart = (datagame) => {
        console.log(datagame);
    }

    componentDidMount() {
        var id = this.props.match.params.id
        Axios.get(`${APIURL}game/getdetailgame/${id}`)
            .then(res => {
                // console.log(res.data)
                this.setState({ detailgame: res.data[0] })
                // console.log(this.state.detailgame);

            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        if (this.state.detailgame) {
            return (
                <div className='box-game' onFocus>
                    <div className='detail-foto'>
                        <img src={`${APIURLImg + this.state.detailgame.foto}`} alt="" style={{ width: '500px', height: '300px', borderRadius: '10px' }} />
                        <div style={{ marginLeft: '50px' }}>
                            <div style={{ fontSize: '40px' }}> {this.state.detailgame.namaGame} </div>
                            <div style={{ marginTop: '10px', marginBottom: '7px' }}>{this.state.detailgame.namaGenre}</div>
                            <div style={{ marginBottom: '20px' }}>{this.state.detailgame.deskripsi}</div>
                            <Button onClick={() => this.onAddtoCart(this.state.detailgame)} variant='dark' title='Buy'> <NumberFormat value={this.state.detailgame.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <h1>loading ...</h1>
        )
    }
}

export default DetailStore;