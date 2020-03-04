import React, { Component } from 'react'
import JumbotronStore from '../components/jumbotronStore'
import CardStore from './../components/cardStore'

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