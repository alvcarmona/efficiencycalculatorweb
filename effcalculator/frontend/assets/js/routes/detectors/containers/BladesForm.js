/**
 * Created by alvarocbasanez on 04/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
const  { DOM: { input, select, textarea } } = React
import {connect} from 'react-redux';

let BladesForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit }>
             <div>
                <label htmlFor="Threshold">Number of blades</label>
                <Field name="nb" component="input" type="number"/>
            </div>
            <div>
                <label htmlFor="Angle">Converter thickness</label>
                <Field name="thickness" component="input" type="number"/>
            </div>
            <button type="submit">Submit</button>
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