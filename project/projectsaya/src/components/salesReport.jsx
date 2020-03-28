import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import Axios from 'axios';
import { APIURL } from '../helper/apiurl'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

class ReportSales extends Component {
    state = {
        dataHistory: [],
        page: 1,
        pager: {}
    }


    renderHistory = () => {
        var dataHistory = this.state.dataHistory

        if (dataHistory.length) {

            return dataHistory.map((val, index) => {
                // console.log(dataHistory)
                return (
                    < tr >
                        <td>{index + 1}</td>
                        <td>{val.namaGame}</td>
                        <td>{val.jumlahUser}</td>
                        <td> <NumberFormat value={val.total_penjualan} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></td>
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
        Axios.get(`${APIURL}game/gethistory/${this.state.page}`)
            .then(res => {
                console.log(res.data);
                this.setState({ dataHistory: res.data.pageOfData, pager: res.data.pager })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidUpdate(_, prevState) {
        if (prevState.page !== this.state.page) {
            Axios.get(`${APIURL}game/gethistory/${this.state.page}`)
                .then(res => {
                    this.setState({ dataHistory: res.data.pageOfData, pager: res.data.pager })
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
                <Table striped bordered hover variant="dark" style={{ marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Game</th>
                            <th>Total Download</th>
                            <th>Total Pembelian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderHistory()}
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
            </div>
        );
    }
}

export default ReportSales;