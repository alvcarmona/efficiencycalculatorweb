/**
 * Created by alvarocbasanez on 03/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'

const {DOM: {input, select, textarea}} = React
import {connect} from 'react-redux';
import {Grid, Button, Row, Col, Panel, PageHeader, small} from 'react-bootstrap'

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue1 = minValue(1)
const maxValue = max => value =>
    value && value > max ? `Max value is ${max}` : undefined
const maxValue800 = maxValue(800)
const maxValue90 = maxValue(90)

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


let DetectorForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div className={"form-field"}>
                <label htmlFor="Detector name">Detector Name</label>
                <Field name="name" component={renderField} type="text" validate={[required, maxLength15]}/>
            </div>
            <div className={"form-field"}>
                <label htmlFor="Angle">Angle (°)</label>
                <Field name="angle" component={renderField} type="number" validate={[required, minValue1, maxValue90]}/>
            </div>
            <div className={"form-field"}>
                <label htmlFor="Threshold">Threshold  (KeV)</label>
                <Field name="threshold" component={renderField} type="number"
                       validate={[required, minValue1, maxValue800]}/>
            </div>
            <div className={"form-field"}>
                <label htmlFor="Converter">Converter configuration</label>
                <Row>
                    <Field name="converter" component="select">
                        <option></option>
                        <option value="10B4C 2.24g/cm3">10B4C 2.24g/cm3</option>
                        <option value="10B4C 2.20g/cm3">10B4C 2.20g/cm3</option>
                    </Field>
                </Row>
            </div>
            <button className="submitButton btn btn-success" type="submit">Submit</button>
        </form>
    )
}

DetectorForm = reduxForm({
    // a unique name for the form
    form: 'detector'
})(DetectorForm)

DetectorForm = connect(
    state => ({
        initialValues: state.example.detectorsSelected[Object.keys(state.example.detectorsSelected)[0]] // pull initial values from account reducer
    })// bind account loading action creator
)(DetectorForm)



import {editCurrentDetector,createDetector} from '../../../../modules/actions/index';
import {bindActionCreators} from 'redux';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editCurrentDetector,createDetector}, dispatch)
}
function mapStateToProps(state) {
    return {
        detectorsSelected: state.example.detectorsSelected,
    }
}
@connect(mapStateToProps, mapDispatchToProps)
class DetectorFormContainer extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    submit = (values) => {
        // print the form values to the console
        this.props.detector.name = values.name
        this.props.detector.angle = values.angle
        this.props.detector.threshold = values.threshold
        this.props.detector.converter = values.converter
        if (this.props.detector.id) this.props.editCurrentDetector(this.props.detector)
        else this.props.createDetector(this.props.detector)
    }
  render () {
    return <DetectorForm className='basicInfoForm' onSubmit={this.submit}/>
  }
}


export default DetectorFormContainer;