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

let BladesForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit }>
             <div>
                <label htmlFor="Threshold">Number of blades</label>
                <Field name="nb" component={renderField} type="number"/>
            </div>
            <div>
                <label htmlFor="Angle">Converter thickness</label>
                <Field name="thickness" component={renderField} type="number"/>
            </div>
            <button type="submit">Add blades</button>
        </form>
    )
}

BladesForm = reduxForm({
    // a unique name for the form
    form: 'blades'
})(BladesForm)

/*
BladesForm = connect(
  state => ({
    initialValues: state.example.currentDetector.blades // pull initial values from account reducer
  })// bind account loading action creator
)(BladesForm)
/
 */
export default BladesForm;