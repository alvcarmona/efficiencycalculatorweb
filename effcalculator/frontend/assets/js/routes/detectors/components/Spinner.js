/**
 * Created by alvarocbasanez on 27/07/17.
 */
import React, {Component} from 'react';

class Spinner extends Component{
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className='loading'>Loading&#8230;</div>
		)
	}
};

export default Spinner;