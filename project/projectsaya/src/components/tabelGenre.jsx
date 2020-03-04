import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from 'reactstrap'
import Axios from 'axios'
import { APIURL } from '../helper/apiurl'

class TabelGenre extends Component {
    state = {
        modaladd: false,
        genre: []
    }

    onDeleteClick = (index) => {
        var genre = this.state.genre
        console.log(genre[index].id)
    }

    onSaveClick = () => {
        var namaGenre = this.refs.genre.value
        console.log(namaGenre);
        Axios.post(`${APIURL}game/addgenre`, {
            namaGenre
        })
            .then(res => {
                this.setState({ modaladd: false })
                Axios.get(`${APIURL}game/getgenre`)
                    .then(res => {
                        this.setState({ genre: res.data })
                        console.log('get genre', res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderTabel = () => {
        var tabelgenre = this.state.genre
        // console.log(tabel.length)
        // console.log(tabel)
        if (tabelgenre.length) {
            return tabelgenre.map((val, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{val.namaGenre}</td>
                            <td>
                                <Button size="sm" variant="dark" onClick={() => this.onDeleteClick(index)} >Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        } else {
            return <h1>loading ...</h1>
        }
    }

    componentDidMount() {
        Axios.get(`${APIURL}game/getgenre`)
            .then(res => {
                this.setState({ genre: res.data })
                console.log('get genre', res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>

                <Modal isOpen={this.state.modaladd} toggle={() => this.setState({ modaladd: false })}>
                    <ModalHeader className='header-addmodal'>
                        Add Genre
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <input type="text" placeholder="Nama Genre" ref="genre" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.onSaveClick} variant='dark'>Save</Button>
                        <Button onClick={() => this.setState({ modaladd: false })} variant='dark'>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div className="button-add">
                    <Button variant='dark' size='sm' onClick={() => this.setState({ modaladd: true })}>
                        Add Genre
                    </Button>
                </div>
                <Table striped bordered hover variant="dark" style={{ marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Genre</th>
                            <th style={{ justifyContent: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    {this.renderTabel()}
                </Table>
            </div>
        );
    }
}

export default TabelGenre;