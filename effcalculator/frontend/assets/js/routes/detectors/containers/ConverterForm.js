/**
 * Created by alvarocbasanez on 03/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
const  { DOM: { input, select, textarea } } = React
import {connect} from 'react-redux';

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)


let ConverterForm = props => {
    const {submit} = props
    return (
        <form onSubmit={ submit }>

        </form>
    )
}

ConverterForm = reduxForm({
    // a unique name for the form
    form: 'converter'
})(ConverterForm)
/*
ConverterForm = connect(
  state => ({
    initialValues: state.example.currentDetector // pull initial values from account reducer
  })// bind account loading action creator
)(ConverterForm)

export default DetectorForm;
*/
export default ConverterForm;