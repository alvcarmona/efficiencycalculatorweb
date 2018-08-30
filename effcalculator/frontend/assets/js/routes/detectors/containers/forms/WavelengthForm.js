/**
 * Created by alvarocbasanez on 04/08/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'

const {DOM: {input, select, textarea}} = React
import {connect} from 'react-redux';
import {
    Grid,
    Button,
    Row,
    Col,
    Panel,
    PageHeader,
    small,
    FormGroup,
    FormControl,
    HelpBlock,
    Form,
    ControlLabel
} from 'react-bootstrap'

const required = value => value ? undefined : 'Required'
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue1 = minValue(1)
const minValue0 = minValue(0.1)
const maxValue = max => value =>
    value && value > max ? `Max value is ${max}` : undefined
const maxValue800 = maxValue(800)
const maxValue20 = maxValue(20)


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

let WavelengthForm = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Wavelength">Wavelength (Å)</label>
                <Field name="Wavelength" validate={[required, minValue0, maxValue20]} component={renderField}
                       type="number"/>
            </div>
            <button className="submitButton btn btn-success" type="submit">Add monochromatic wavelength</button>
        </form>
    )
}

WavelengthForm = reduxForm({
    // a unique name for the form
    form: 'wavelength'
})(WavelengthForm)

import {editCurrentDetector} from '../../../../modules/actions/index';
import {bindActionCreators} from 'redux';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({editCurrentDetector}, dispatch)
}

function mapStateToProps(state) {
    return {
        detectorsSelected: state.example.detectorsSelected,
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class WavelengthFormContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    submit = (values) => {
        // print the form values to the console
        let wavelength = [];
        wavelength.push({weight: 100, angstrom: parseFloat(values.Wavelength)});
        this.props.detector.wavelength = wavelength;
        this.props.editCurrentDetector(this.props.detector);
    }

    submitImportedWavelength(wavelength){
        let processedWave=[];
        wavelength.map((elem)=>{
          processedWave.push({angstrom: elem[0], weight: elem[1]})
        });
        this.props.detector.wavelength = processedWave
        this.props.editCurrentDetector(this.props.detector);
    }

    handleFileSelect(submit) {
        event.preventDefault();
        const files = document.getElementById('formControlsFile').files; // FileList object
        // files is a FileList of File objects. List some properties.
         let wavelength=[];
        for (let i = 0, f; f = files[i]; i++) {
            let reader = new FileReader();
            // Closure to capture the file information.
            console.log('abre archivo');
            let step;
            var promise = Promise.resolve();
            reader.onload = (function (theFile) {
                return function (e) {
                    try {
                        step = e.target.result.split(/\n/).map(function (row) { return row.split(";"); });
                         const wavelength=step.map(function (row) {
                            return row[0].split(/[ ,]+/).filter(Boolean).map(Number) });
                        submit(wavelength)
                    } catch (ex) {
                        alert('Unable to read as JSON' + ex);
                    }
                }
            })(f);
            reader.readAsText(f);
        }

    }



    render() {
        return <div>
            <Row>
                <Col md={4}>
                    <WavelengthForm onSubmit={this.submit}/>
                </Col>
                <Col md={4} mdOffset={2}>
                    <Form>
                        <FormGroup controlId={"formControlsFile"}>
                            <ControlLabel>{"Import"}</ControlLabel>
                            <FormControl type="file" accept="*.txt"/>
                            <HelpBlock>{"path to two column file"}</HelpBlock>
                            <Button onClick={this.handleFileSelect.bind(this, this.submitImportedWavelength.bind(this))}
                                    className="btn-success"> Import Polychromatic wavelength </Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        </div>
    }
}

export default WavelengthFormContainer;