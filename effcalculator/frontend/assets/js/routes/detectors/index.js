/**
 contains a Route. Again, this goes down the path of breaking things down into as many small components as possible.
 I would recommend this (as oppoesd to having a route hierarchy written in XML) as it allows you to instantiate
 routes only as you need them. This also means that your route file will only including other files in relative
 sub-directories, which feels nice and de-coupled.
 Your route file can then also be the guardian of the data in your store when you go to the route, by making use of the
 onEnter and onLeave methods. In here you can dispatch fetch actions that ensure that your components have the data
 they need. This is really useful when you have deep nested routes.
 */

/**
 * Created by alvarocbasanez on 12/07/17.
 */
import React, {Component} from 'react';
import DetectorListContainer from './containers/DetectorListContainer';
import DetectorDetailContainer from './containers/DetectorDetailContainer';
import DetectorEditContainer from './containers/DetectorEditContainer';
import DetectorEfficiencyContainer from './containers/DetectorEfficiencyContainer';
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux';
import {fetchData, setCurrentDetector} from '../../modules/actions/index';
import {bindActionCreators} from 'redux';

function mapStateToProps(state) {
    return {data: state.data}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchData, setCurrentDetector}, dispatch)
}

class DetectorEfficiencyCalculator extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        return (
            <div className="DetectorEfficiencyCalculator">
                <Switch>
                    <Route exact path='/Detectors' component={DetectorListContainer}/>
                    <Route exact path='/Detectors/:number' component={DetectorDetailContainer}/>
                    <Route path='/Detectors/:number/edit' component={DetectorEditContainer}/>
                    <Route path='/Detectors/:number/efficiency' component={DetectorEfficiencyContainer}/>
                </Switch>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetectorEfficiencyCalculator)
