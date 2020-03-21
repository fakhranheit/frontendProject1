import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'
import { Link } from 'react-router-dom'
import AOS from "aos";

class CardStore extends Component {
    state = {
        dataGame: [],
        page: 1,
        pager: {}
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
        if (prevState.page !== this.state.page) {
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

    render() {
        AOS.init({
            delay: 5000
        });
        var { pager } = this.state
        return (
            <div data-aos="fade-up">
                <h1 style={{ fontFamily: 'Oxanium', color: 'white', display: 'flex', justifyContent: 'center', paddingTop: '100px' }}>All Games</h1>
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