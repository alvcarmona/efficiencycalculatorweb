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
import {Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux';
import {fetchData, setCurrentDetector} from '../../modules/actions/index';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types'

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
        this.props.fetchData('/api/detectors/')
    }

    RenderDetectorDetail() {
        let i = 0;
        let current = {};
        for (; i < this.props.data.length; i++) {
            if (this.props.data[i].id === this.props.match.params.number) {
                current = this.props.data[i]
            }
        }
        this.props.setCurrentDetector(current)
        return <DetectorDetail />
    }


    render() {
        return (
            <div className="DetectorEfficiencyCalculator">
                <Switch>
                    <Route exact path='/frontend/Detectors' component={DetectorListContainer}/>
                    <Route exact path='/frontend/Detectors/:number' component={DetectorDetailContainer}/>
                    <Route path='/frontend/Detectors/:number/edit' component={DetectorEditContainer}/>
                </Switch>
            </div>
        );
    }
}

class RoutesHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {detectors: props.detectors};
        this.RenderDetectorList = (props) => {
            return (
                <DetectorList detectors={this.props.detectors}/>
            );
        };
        this.RenderDetectorDetail = (props) => {
            return (
                <DetectorDetail detectors={this.props.detectors}/>
            );
        };
        this.RenderDetectorEditor = (props) => {
            return (
                <DetectorEditor detectors={this.props.detectors}/>
            );
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({detectors: nextProps.detectors})
        this.forceUpdate()
    }


    render() {
        return (
            <div className="RoutesHandler">
                <Switch>
                    <Route exact path='/frontend/Detectors' render={this.RenderDetectorList}/>
                    <Route path='/frontend/Detectors/:number/edit' render={this.RenderDetectorEditor}/>
                    <Route path='/frontend/Detectors/:number'
                           render={ routeProps => {
                               let i = 0;
                               let current = {};
                               for (; i < this.props.detectors.length; i++) {
                                   if (this.props.detectors[i].id === routeProps.match.params.number) {
                                       current = this.props.detectors[i]
                                   }
                               }
                               return (
                                   <DetectorDetail detectors={this.props.detectors} routeProps={routeProps}
                                                   currentDetector={current}/>)
                           }}/>
                </Switch>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DetectorEfficiencyCalculator)
