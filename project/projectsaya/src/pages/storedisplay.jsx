import React, { Component } from 'react'
import CardStore from './../components/cardStore'
import JumbotronStore from '../components/jumbotronStore'

class StoreDisplay extends Component {
    state = {}
    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <JumbotronStore />
                <CardStore />
            </div>
        );
    }
}

export default StoreDisplay;