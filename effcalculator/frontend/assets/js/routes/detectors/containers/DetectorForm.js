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


let DetectorForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={ handleSubmit }>
            <div>
                <label htmlFor="Detector name">Detector Name</label>
                <Field name="name"  component={renderField}  type="text" validate={[ required, maxLength15 ]}/>
            </div>
            <div>
                <label htmlFor="Angle">Angle</label>
                <Field name="angle" component={renderField} type="number" validate={[ required]}/>
            </div>
            <div>
                <label htmlFor="Threshold">Threshold</label>
                <Field name="threshold" component={renderField} type="number" validate={[ required ]}/>
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