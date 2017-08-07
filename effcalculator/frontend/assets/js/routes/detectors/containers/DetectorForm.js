/**
 * Created by alvarocbasanez on 03/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
const  { DOM: { input, select, textarea } } = React
import {connect} from 'react-redux';

let DetectorForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="Detector name">Detector Name</label>
                <Field name="name" component="input" type="text"/>
            </div>
            <div>
                <label htmlFor="Angle">Angle</label>
                <Field name="angle" component="input" type="number"/>
            </div>
            <div>
                <label htmlFor="Threshold">Threshold</label>
                <Field name="threshold" component="input" type="number"/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

DetectorForm = reduxForm({
    // a unique name for the form
    form: 'detector'
})(DetectorForm)

DetectorForm = connect(
  state => ({
    initialValues: state.example.currentDetector // pull initial values from account reducer
  })// bind account loading action creator
)(DetectorForm)

export default DetectorForm;