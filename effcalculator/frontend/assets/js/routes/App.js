import React, {Component} from 'react';
import Homepage from  './homepage'
import Explanation from './ExplanationComponent'
import detectors from './detectors/index'
import NavBarContainer from './NavbarContainer'
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
                       <Route exact path='/' component={Homepage}/>
                        <Route path='/detectors/' component={detectors} />
                         <Route path='/explanation/' component={Explanation} />
                    </Switch>
                </div>
            </div>
        );
    }
}


export default App;