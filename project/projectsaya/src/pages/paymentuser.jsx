import React, { Component } from 'react'
import { connect } from 'react-redux'


class PaymentUser extends Component {
    state = {}
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        totalharga: state.auth.datacart
    };
};
export default connect(mapStateToProps, {})(PaymentUser);