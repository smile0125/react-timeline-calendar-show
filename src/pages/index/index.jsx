import React, { Component } from 'react';
import * as ActionCreaters from '../../redux/action/actionCreaters.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
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
                <Button onClick={this.handleClick}>点击</Button>
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