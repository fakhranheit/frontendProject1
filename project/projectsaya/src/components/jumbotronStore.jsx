import React, { Component } from 'react'
import Axios from 'axios'
import { APIURL } from '../helper/apiurl'


class JumbotronStore extends Component {
    state = {
        dataGenre: {}
    }


    renderList = () => {
        var genre = this.state.dataGenre
        if (genre.length) {
            return genre.map((val) => {
                // console.log('ini genre', genre);
                return <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', alignItems: 'center' }} value={val.id}>
                    <div style={{ cursor: 'pointer' }}>
                        {val.namaGenre}
                    </div>
                </div>
            })
        }
        else {
            return <h1>Loading ...</h1>
        }
    }

    componentDidMount() {
        Axios.get(`${APIURL}game/getgenre`)
            .then(res => {
                this.setState({ dataGenre: res.data })
                // console.log('get genre', res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', marginTop: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ margin: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: "#141a2d", borderRadius: '30px' }}>
                        <div style={{ color: 'white', marginLeft: '50px', marginTop: '20px', fontWeight: 'bolder', fontSize: '2rem', fontFamily: 'Patua One' }}>Upcoming games</div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <iframe title='video' style={{ paddingTop: '20px', paddingLeft: '50px', paddingRight: '50px', paddingBottom: '50px' }} width="560" height="400" src="https://www.youtube.com/embed/DbolchbGedk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />

                            <div style={{ borderRadius: "10px", padding: '20px', backgroundColor: '#1b2838', color: 'white', fontWeight: 'bolder', minWidth: '30vh', marginTop: '20px', marginBottom: '50px', marginRight: '50px' }}>
                                <div style={{ fontFamily: 'Oxanium' }}>
                                    <div style={{ fontSize: '20px', marginBottom: '20px' }}>Browse by Genre</div>
                                    {this.renderList()}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JumbotronStore;