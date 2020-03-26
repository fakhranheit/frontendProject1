import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'
import { Link } from 'react-router-dom'
import { CustomInput } from 'reactstrap'
import AOS from "aos";
import SearchIcon from '@material-ui/icons/Search';
import { Button } from 'react-bootstrap'

class CardStore extends Component {
    state = {
        dataGame: [],
        page: 1,
        pager: {},
        search: ''
    }

    searchGame = () => {
        var search = this.state.search
        if (search !== '') {
            this.setState({ page: 1 })
            console.log('searched game', search);
            Axios.post(`${APIURL}game/searchgame/${this.state.page}`, { search })
                .then(res => {
                    console.log(res.data);
                    this.setState({ dataGame: res.data.pageOfData, pager: res.data.pager })
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log('masuk all game');
            Axios.get(`${APIURL}game/getstore/${this.state.page}`)
                .then(res1 => {
                    console.log('get game', res1.data)
                    this.setState({ dataGame: res1.data.pageOfData, pager: res1.data.pager })
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    renderProduk = () => {
        var dataGame = this.state.dataGame
        return dataGame.map((val) => {
            return (
                <div className="img-hover-zoom" data-aos="fade-down">
                    <Link to={"/detailstore/" + val.id}>
                        <div className="card text-white" style={{ padding: '10px', backgroundColor: '#1b2838', fontFamily: 'Oxanium' }}>
                            <img className="card-img " src={`${APIURLImg + val.foto}`} alt="" style={{ width: '300px', height: '200px', borderRadius: '10px' }} />
                            <div className="card-img-overlay" >
                                <div style={{ paddingTop: '105px' }}>
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
        Axios.get(`${APIURL}game/getstore/${this.state.page}`)
            .then(res1 => {
                console.log('get game', res1.data)
                this.setState({ dataGame: res1.data.pageOfData, pager: res1.data.pager })
            })
            .catch(err => {
                console.log(err)
            })
    }


    componentDidUpdate(_, prevState) {
        if (prevState.page !== this.state.page && this.state.search == '') {
            Axios.get(`${APIURL}game/getstore/${this.state.page}`)
                .then(res1 => {
                    console.log('get game', res1.data)
                    this.setState({ dataGame: res1.data.pageOfData, pager: res1.data.pager })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (prevState.page !== this.state.page && this.state.search !== '') {
            var search = this.state.search
            Axios.post(`${APIURL}game/searchgame/${this.state.page}`, { search })
                .then(res => {
                    console.log(res.data);
                    this.setState({ dataGame: res.data.pageOfData, pager: res.data.pager })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    render() {
        AOS.init({
            delay: 5000
        });
        var { pager } = this.state
        // console.log('ini pager', pager)
        return (
            <div data-aos="fade-up" style={{ fontFamily: 'Oxanium', color: 'white' }}>
                <h1 style={{ display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>
                    <CustomInput placeholder="search the game here" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} />
                    <Button variant='dark' onClick={this.searchGame} >
                        <SearchIcon fontSize='large' />
                    </Button>
                </h1>
                <div className="box-card-store row ">
                    {this.renderProduk()}
                </div>
                <div style={{ marginLeft: '35%', width: '350px' }}>
                    {pager.pages && pager.pages.length &&
                        <ul className="pagination" style={{ backgroundColor: '#343a40', color: 'white' }}>
                            <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=1` }} className="page-link" onClick={() => this.setState({ page: pager.startPage })}  >First</Link>
                            </li>
                            <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link className="page-link" onClick={() => this.setState({ page: pager.currentPage - 1 })}>Previous</Link>
                            </li>
                            {pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <Link className="page-link" onClick={() => this.setState({ page: page })}>{page}</Link>
                                </li>
                            )}
                            <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link className="page-link" onClick={() => this.setState({ page: pager.currentPage + 1 })}>Next</Link>
                            </li>
                            <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link className="page-link" onClick={() => this.setState({ page: pager.endPage })}>Last</Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>

        );
    }
}

export default CardStore;