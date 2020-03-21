import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CustomInput } from 'reactstrap';
import Axios from 'axios'
import { APIURL } from '../helper/apiurl'
import NumberFormat from 'react-number-format'
import { Button } from 'react-bootstrap'


class PaymentUser extends Component {
    state = {
        addImage: null,
        totalharga: 0,
        iduser: 0
    }

    onChangeImage = (event) => {
        // console.log(event.target.files[0]);
        var file = event.target.files[0]
        if (file) {
            this.setState({ addImage: file })
            console.log(this.state.addImage);
        } else {
            alert('masukan foto')
        }
    }

    uploadImage = () => {
        console.log(this.state.addImage, this.state.iduser);
        var formdata = new FormData()
        var foto = this.state.addImage
        var iduser = this.state.iduser
        var tanggalupload = new Date()
        var datainput = {
            tanggalupload
        }
        var Headers = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        formdata.append('image', foto)
        formdata.append('data', JSON.stringify(datainput))


        console.log(formdata);

        Axios.put(`${APIURL}user/uploadTrans/${iduser}`, formdata, Headers)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        var id = localStorage.getItem("id")
        this.setState({ iduser: id })
        // var id = this.props.iduser
        Axios.get(`${APIURL}user/gettotalharga/${id}`)
            .then(res => {
                console.log(res.data)
                this.setState({ totalharga: res.data[0].totalharga })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.props.iduser);
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '800px', marginTop: '50px', minHeight: '100vh', padding: '30px', backgroundColor: '#161f2d' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                            <h1 style={{ fontFamily: 'Oxanium' }}>Payment</h1>
                        </div>
                        <div>
                        </div>
                        <div style={{ minWidth: '100px', marginTop: '20px', color: 'white', fontFamily: 'Oxanium', fontSize: '25px', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
                                <NumberFormat value={this.state.totalharga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} style={{ color: 'white', marginLeft: '10px', marginBottom: '30px' }} />
                            </div>
                            <CustomInput type="file" style={{ borderRadius: '10px', padding: '10px' }} onChange={this.onChangeImage} />
                            <div style={{ display: 'flex', justifyContent: 'center', color: 'white', marginTop: '30px' }}>
                                <Button variant='dark' onClick={this.uploadImage}>Upload</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        iduser: state.auth.id
    };
};
export default connect(mapStateToProps, {})(PaymentUser);