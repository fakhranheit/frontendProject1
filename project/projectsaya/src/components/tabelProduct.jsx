import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText } from 'reactstrap'
import Axios from 'axios'
import { APIURL, APIURLImg } from '../helper/apiurl'

class TableProduct extends Component {
    state = {
        modaladd: false,
        modaledit: false,
        addImageFile: null,
        editImageFile: null,
        genre: [],
        genreId: 0,
        tabelData: [],
        indexedit: -1,
        dataedit: []
    }

    renderSelect = () => {
        var genre = this.state.genre
        return genre.map((val, index) => {
            return <option value={val.id} key={index}>{val.namaGenre}</option>
        })
    }


    renderTabel = () => {
        var tabel = this.state.tabelData
        // console.log(tabel.length)
        // console.log(tabel)
        if (tabel.length) {
            return tabel.map((val, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                            {/* {console.log('INI TANGGAL UPLOAD', val.tanggalUpload)} */}
                            <td>{index + 1}</td>
                            <td>{val.namaGame}</td>
                            <td>{val.deskripsi}</td>
                            <td>{val.namaGenre}</td>
                            <td>{val.harga}</td>
                            <td><img src={`${APIURLImg + val.foto}`} height="40px" alt='' /></td>
                            <td>{val.tanggalUpload}</td>
                            <td>
                                <Button size="sm" variant="dark" onClick={() => this.clickEdit(index)}>Edit</Button>
                                <Button size="sm" variant="dark" onClick={() => this.deleteBtn(index)} >Delete</Button>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        } else {
            return <h1>loading ...</h1>
        }
    }

    clickEdit = (index) => {
        Axios.get(`${APIURL}game/getgenre`)
            .then(res => {
                this.setState({ genre: res.data })
                console.log('get genre', res.data)
            })
            .catch(err => {
                console.log(err)
            })

        let tabelData = this.state.tabelData
        this.setState({ modaledit: true, dataedit: tabelData[index] })
        console.log(this.state.dataedit)
    }

    onSaveEdit = () => {
        var idEdit = this.state.dataedit.id
        var formdata = new FormData()
        var namaGame = this.refs.editgame.value
        var deskripsi = this.refs.editdeskripsi.value
        var Foto = this.state.editImageFile
        var genreId = this.state.genreId
        var harga = this.refs.editharga.value
        var tanggalUpload = new Date()
        var dataedit = {
            namaGame,
            deskripsi,
            genreId,
            harga,
            tanggalUpload
        }

        var Headers = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        formdata.append('image', Foto)
        formdata.append('data', JSON.stringify(dataedit))

        Axios.put(`${APIURL}game/editgame/${idEdit}`, formdata, Headers)
            .then(res => {
                this.setState({ modaledit: false, tabelData: res.data })

            })
            .catch(err => {
                // console.log(err)
            })
    }

    onChangeImageEdit = (event) => {
        console.log('ini image edit', event.target.files[0]);
        var file = event.target.files[0]
        if (file) {
            this.setState({ editImageFile: event.target.files[0] })
        } else {
            alert('masukan foto')
        }
    }

    deleteBtn = (index) => {
        var hapusdata = this.state.tabelData
        var selectedId = hapusdata[index].id
        // console.log(selectedId)
        Axios.delete(`${APIURL}game/deletegame/${selectedId}`)
            .then(res => {
                console.log('berhasil', res.data)
                this.setState({ modaladd: false, tabelData: res.data.dataProduct })
            }).catch(err => {
                console.log('error', err)
            })
    }

    onSaveClick = () => {
        var formdata = new FormData()
        var namaGame = this.refs.game.value
        var deskripsi = this.refs.deskripsi.value
        var Foto = this.state.addImageFile
        var genreId = this.state.genreId
        var harga = this.refs.harga.value
        var tanggalUpload = new Date()
        var datagame = {
            namaGame,
            deskripsi,
            genreId,
            harga,
            tanggalUpload
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
                // console.log('resdatagame', res.data.dataGame)
                this.setState({ tabelData: res.data.dataGame })
                this.setState({ modaladd: false })
                Axios.get(`${APIURL}game/getgame`)
                    .then(res1 => {
                        this.setState({ tabelData: res1.data })
                        console.log('get game', res1.data)
                    })
                    .catch(err => {
                        // console.log(err)
                    })
            })
            .catch(err => {
                // console.log(err)
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

    componentDidMount() {
        Axios.get(`${APIURL}game/getgame`)
            .then(res1 => {
                // console.log('get game', res1.data)
                this.setState({ tabelData: res1.data })
            })
            .catch(err => {
                console.log(err)
            })
        Axios.get(`${APIURL}game/getgenre`)
            .then(res => {
                this.setState({ genre: res.data })
                // console.log('get genre', res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div style={{ marginTop: '20px' }}>

                {/* Modal Add */}
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
                                <input type="number" placeholder="Harga Produk" ref="harga" />
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
                {/* Modal Add selesai */}
                {/* Modal Edit */}
                <Modal isOpen={this.state.modaledit} toggle={() => this.setState({ modaledit: false })}>
                    <ModalHeader className='header-addmodal'>
                        Edit Data
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>''
                                <input type="text" defaultValue={this.state.dataedit.namaGame} ref="editgame" />
                            </FormGroup>
                            <FormGroup>
                                <input type="number" defaultValue={this.state.dataedit.harga} placeholder="Harga Produk" ref="editharga" />
                            </FormGroup>
                            <FormGroup>
                                <textarea type="text" defaultValue={this.state.dataedit.deskripsi} placeholder="Deskripsi" ref="editdeskripsi" />
                            </FormGroup>
                            <FormGroup>
                                <FormText >Foto</FormText>
                                <input type="file" name="file" onChange={this.onChangeImageEdit} />
                                <FormText color="muted">
                                    Format foto harus dalam bentuk PNG
                                </FormText>
                            </FormGroup>
                            <FormGroup>
                                <FormText>
                                    Genre
                                </FormText>
                                <select onChange={this.onChangeGenre} >
                                    <option hidden defaultValue={this.state.dataedit.namaGame}>pilih genre</option>
                                    {this.renderSelect()}
                                </select>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='dark' onClick={this.onSaveEdit}>Save</Button>
                        <Button variant='dark' onClick={() => this.setState({ modaledit: false })}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                {/* Modal Edit selesai*/}
                {/* table produk*/}

                <div className="button-add">
                    <Button variant='dark' size='sm' onClick={() => this.setState({ modaladd: true })}>
                        Add Product
                    </Button>
                </div>
                <Table striped bordered hover variant="dark" style={{ marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Produk</th>
                            <th>Deskripsi</th>
                            <th>Genre</th>
                            <th>Harga</th>
                            <th>Foto</th>
                            <th>Tanggal Upload</th>
                            <th style={{ justifyContent: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    {this.renderTabel()}
                </Table>
            </div>
        );
    }
}

export default TableProduct;