import React, { Component } from 'react'
import CardStore from './../components/cardStore'
import JumbotronStore from '../components/jumbotronStore'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class StoreDisplay extends Component {
    state = {}
    render() {
        if (this.props.role !== 'user') {
            return <Redirect to='/' />
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <JumbotronStore />
                <CardStore />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        role: state.auth.role
    };
};

export default connect(mapStateToProps)(StoreDisplay);