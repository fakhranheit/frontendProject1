import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText } from 'reactstrap'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'

class TableAdmin extends Component {
    state = {
        modaladd: false,
        modaledit: false,
        addImageFile: null,
        genre: [],
        genreId: 0,
        tabelData: {}

    }

    componentDidMount() {
        Axios.get(`${APIURL}game/getgame`)
            .then(res1 => {
                this.setState({ tabelData: res1.data })
                console.log('get game', res1.data)
            })
            .catch(err => {
                console.log(err)
            })
        Axios.get(`${APIURL}game/getgenre`)
            .then(res => {
                this.setState({ genre: res.data })
                console.log('get genre', res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderSelect = () => {
        var genre = this.state.genre
        return genre.map((val, index) => {
            // console.log(val.id)
            // console.log(val.namaGenre)
            return <option value={val.id} key={index}>{val.namaGenre}</option>
        })
    }


    renderTabel = () => {
        var tabel = this.state.tabelData
        console.log(tabel.length)
        console.log(tabel)
        if (tabel.length) {
            return tabel.map((val, index) => {
                return (
                    <tr>
                        <td scope='row'>{index + 1}</td>
                        <td>{val.namaGame}</td>
                        <td>Game RPG</td>
                        <td>RPG</td>
                        <td><img src={`${APIURLImg + val.foto}`} height="40px" /></td>
                        <td>
                            <Button size="sm" variant="dark">Edit</Button>
                            <Button size="sm" variant="dark">Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }

    onSaveClick = () => {
        var formdata = new FormData()
        var namaGame = this.refs.game.value
        var deskripsi = this.refs.deskripsi.value
        var Foto = this.state.addImageFile
        var genreId = this.state.genreId
        var datagame = {
            namaGame,
            deskripsi,
            genreId
        }

        var Headers = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        formdata.append('image', Foto)
        formdata.append('data', JSON.stringify(datagame))

        Axios.post(`${APIURL}game/addgame`, formdata, Headers)
            .then(res => {
                console.log('resdatagame', res.data.dataGame)
                this.setState({ tabelData: res.data.dataGame })
                this.setState({ modaladd: false })
                console.log(formdata)
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChangeImage = (event) => {
        console.log(event.target.files[0]);
        var file = event.target.files[0]
        if (file) {
            this.setState({ addImageFile: event.target.files[0] })
        } else {
            alert('masukan foto')
        }
    }

    onChangeGenre = (e) => {
        const { value } = e.target
        this.setState({ genreId: value })
    }

    render() {
        // console.log(this.state.genreId)
        console.log('ini datatble', this.state.tabelData)
        const { tabelData } = this.state
        return (
            <div style={{ marginTop: '30px' }}>
                <Modal isOpen={this.state.modaladd} toggle={() => this.setState({ modaladd: false })}>
                    <ModalHeader className='header-addmodal'>
                        Add Data
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <input type="text" placeholder="Nama Produk" ref="game" />
                            </FormGroup>
                            <FormGroup>
                                <textarea type="text" placeholder="Deskripsi" ref="deskripsi" />
                            </FormGroup>
                            <FormGroup>
                                <FormText >Foto</FormText>
                                <input type="file" name="file" onChange={this.onChangeImage} />
                                <FormText color="muted">
                                    Format foto harus dalam bentuk PNG
                                </FormText>
                            </FormGroup>
                            <FormGroup>
                                <FormText>
                                    Genre
                                </FormText>
                                <select onChange={this.onChangeGenre}>
                                    <option hidden>pilih genre</option>
                                    {this.renderSelect()}
                                </select>
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
                        Add Product
                    </Button>
                </div>
                <Table striped bordered hover variant="dark" style={{ marginTop: '10px', border: '2px solid white' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Deskripsi</th>
                            <th>Genre</th>
                            <th>Foto</th>
                            <th style={{ justifyContent: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTabel()}

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TableAdmin;