import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
// import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText } from 'reactstrap'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'
import { Link } from 'react-router-dom'


class TabelTransaction extends Component {
    state = {
        dataCust: [],
        page: 1,
        pager: {}
    }

    RefreshData = () => {
        Axios.get(`${APIURL}game/getpayment/${this.state.page}`)
            .then(res1 => {
                console.log('get game', res1.data)
                this.setState({ dataCust: res1.data.pageOfData, pager: res1.data.pager })
            })
            .catch(err => {
                console.log(err)
            })
    }

    searchUser = () => {
        var search = this.refs.searched.value
        console.log(search);

        var dataCust = this.state.dataCust;

        var hasil = dataCust.filter(function (data) {
            return data.username === search;
        });

        this.setState({ dataCust: hasil })
    }

    approvePayment = (id, iduser, status) => {
        // console.log(id, status);
        // console.log(id, iduser, status)
        Axios.put(`${APIURL}game/approvepay/${id}`, { iduser, status })
            .then(res => {
                this.setState({ dataCust: res.data.pageOfData, pager: res.data.pager })
            })
            .catch(err => {
                console.log(err)
            })

    }

    renderDataCust = () => {
        var dataCust = this.state.dataCust

        if (dataCust.length) {

            return dataCust.map((val, index) => {

                return (
                    < tr >
                        <td>{index + 1}</td>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.totalharga}</td>
                        <td><img src={`${APIURLImg + val.foto}`} height="40px" alt='' /></td>
                        <td>{val.tanggalupload}</td>
                        <td style={{ display: "column" }}>
                            <Button size="sm" variant="dark" onClick={() => this.approvePayment(val.id, val.iduser, true)} >Approve</Button>
                            <Button size="sm" variant="dark" onClick={() => this.approvePayment(val.id, val.iduser, false)} >Decline</Button>
                        </td>
                    </tr >
                )
            })
        }
        else {
            return (
                <h1>No Transaction</h1>
            )
        }
    }

    componentDidMount() {
        Axios.get(`${APIURL}game/getpayment/${this.state.page}`)
            .then(res1 => {
                console.log('get game', res1.data)
                this.setState({ dataCust: res1.data.pageOfData, pager: res1.data.pager })
            })
            .catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate(_, prevState) {
        if (prevState.page !== this.state.page) {
            Axios.get(`${APIURL}game/getpayment/${this.state.page}`)
                .then(res1 => {
                    console.log('get game', res1.data)
                    this.setState({ dataCust: res1.data.pageOfData, pager: res1.data.pager })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        var { pager } = this.state
        return (
            <div>
                <input placeholder='search user' ref='searched' />
                <Button onClick={this.searchUser} size='sm' variant='dark' >Search</Button>
                <Button onClick={this.RefreshData} size='sm' variant='dark' >Refresh</Button>
                <Table striped bordered hover variant="dark" style={{ marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Total Harga</th>
                            <th>Foto Transaksi</th>
                            <th>Tanggal Transaksi</th>
                            <th style={{ justifyContent: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataCust()}
                    </tbody>
                </Table>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

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
            </div >
        );
    }
}

export default TabelTransaction;