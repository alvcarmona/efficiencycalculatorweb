/**
 * Created by alvarocbasanez on 04/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'

const {DOM: {input, select, textarea}} = React
import {connect} from 'react-redux';
import {Grid, Button, Row, Col, Panel, PageHeader, small} from 'react-bootstrap'

const required = value => value ? undefined : 'Required'
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue1 = minValue(1)
const minValue01 = minValue(0.1)
const minValue0 = minValue(0)
const maxValue = max => value =>
    value && value > max ? `Max value is ${max}` : undefined
const maxValue800 = maxValue(800)
const maxValue10 = maxValue(10)


const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div>
            <Row>
                <Col> <input {...input} placeholder={label} type={type}/> </Col>
                <Col> {touched && ((error && <span className={"error-message"}>{error}</span>) || (warning &&
                    <span>{warning}</span>))}</Col>
            </Row>
        </div>
    </div>
)


let BladesSingleForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Converter thickness">Converter thickness (µm)</label>
                <Field name="thickness" component={renderField} validate={[required, minValue01, maxValue10]}
                       type="number"/>
            </div>
            <div>
                <label htmlFor="Substrate thickness">Substrate thickness (µm)</label>
                <Field name="subThickness" component={renderField} validate={[required, minValue0, maxValue10]}
                       type="number"/>
            </div>
            <button className="submitButton" type="submit">Add blades</button>
        </form>
    )
}

BladesSingleForm = reduxForm({
    // a unique name for the form
    form: 'bladeSingle'
})(BladesSingleForm)


export default BladesSingleForm;