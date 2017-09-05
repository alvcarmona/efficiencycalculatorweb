import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';
import {Button, Glyphicon} from 'react-bootstrap'


function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchData}, dispatch)
}

class FetchDetectorsButtonContainer extends Component {
    constructor(props) {
        super(props);
    }

    fetch(){
        this.props.fetchData()
    }
    render() {
        return (
            <Button onClick={this.fetch}> <Glyphicon glyph="align-left" /></Button>
        );
    }
}


export default connect(mapDispatchToProps)(FetchDetectorsButtonContainer)
