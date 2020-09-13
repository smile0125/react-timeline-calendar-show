import React, { Component } from 'react';
import * as ActionCreaters from '../../redux/action/actionCreaters.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class Index extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        console.log(this.props);
    }

    handleClick = () => {
        console.log(this.props);
        this.props.actions.defaultAction()
    }

    render() {
        console.log(this.props.state, '====')
        const { defaultReducer: { defaultState } } = this.props.state;
        return (
            <div>
                <h1>{ defaultState }</h1>
                <button onClick={this.handleClick}>点击</button>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    state
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreaters, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Index)