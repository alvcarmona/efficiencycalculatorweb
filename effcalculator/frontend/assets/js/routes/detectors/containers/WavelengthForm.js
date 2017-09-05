/**
 * Created by alvarocbasanez on 04/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
const  { DOM: { input, select, textarea } } = React
import {connect} from 'react-redux';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let WavelengthForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="Wavelength">Wavelength</label>
                <Field name="Wavelength" component={renderField} type="number"/>
            </div>
            <button  className="submitButton" type="submit">Add wavelength</button>
        </form>
    )
}

WavelengthForm = reduxForm({
    // a unique name for the form
    form: 'wavelength'
})(WavelengthForm)



export default WavelengthForm;