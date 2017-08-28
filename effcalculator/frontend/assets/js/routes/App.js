import React, {Component} from 'react';
import Homepage from  './homepage'
import detectors from './detectors/index'
import NavBarContainer from './NavBarContainer'
import '../../styles/App.css';
import {Route, Switch, Link} from 'react-router-dom'



class App extends Component {
    constructor(props) {
		super(props);
	}
    render() {
        return (
            <div className="App">

                <div>
                    <NavBarContainer/>
                    <Switch>
                        <Route path='/frontend/homepage' component={Homepage}/>
                        <Route path='/frontend/detectors' component={detectors} />
                    </Switch>
                </div>
            </div>
        );
    }
}


export default App;