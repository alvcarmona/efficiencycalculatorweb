import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchData} from '../../../modules/actions/index';
import {bindActionCreators} from 'redux';
import {Button, Glyphicon} from 'react-bootstrap'

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchData}, dispatch)
}

class RefreshDetectorsContainer extends Component {
    refresh(){
        console.log('refresh')
        this.props.fetchData()
    }
    render() {
        return (<Button className='refreshDetectorsButton' bsStyle="link" onClick={this.refresh.bind(this)}><Glyphicon glyph="refresh" /> </Button>)
    }
}


export default connect(null,mapDispatchToProps)(RefreshDetectorsContainer)
