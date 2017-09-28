/**
 * Created by alvarocbasanez on 04/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
const  { DOM: { input, select, textarea } } = React
import {connect} from 'react-redux';
import {Grid, Button, Row, Col, Panel, PageHeader, small} from 'react-bootstrap'

const required = value => value ? undefined : 'Required'
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue1 = minValue(1)
const minValue0 = minValue(0.1)
const maxValue = max => value =>
  value && value > max ? `Max value is ${max}` : undefined
const maxValue800 = maxValue(800)
const maxValue20 = maxValue(20)



const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div >
    <label>{label}</label>
    <div>
        <Row>
        <Col>   <input {...input} placeholder={label} type={type}/> </Col>
      <Col> {touched && ((error && <span className={"error-message"}>{error}</span>) || (warning && <span>{warning}</span>))}</Col>
            </Row>
    </div>
  </div>
)

let WavelengthForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="Wavelength">Wavelength</label>
                <Field name="Wavelength" validate={[ required, minValue0, maxValue20 ]} component={renderField} type="number"/>
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