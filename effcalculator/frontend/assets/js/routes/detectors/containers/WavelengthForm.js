/**
 * Created by alvarocbasanez on 04/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
const  { DOM: { input, select, textarea } } = React
import {connect} from 'react-redux';

let WavelengthForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit }>
            {/*
             <div>
                <label htmlFor="Threshold">Number of blades</label>
                <Field name="nb" component="input" type="number"/>
            </div>
            */}
            <div>
                <label htmlFor="Wavelength">Wavelength</label>
                <Field name="Wavelength" component="input" type="number"/>
            </div>
            <button type="submit">Add wavelength</button>
        </form>
    )
}

WavelengthForm = reduxForm({
    // a unique name for the form
    form: 'wavelength'
})(WavelengthForm)



export default WavelengthForm;