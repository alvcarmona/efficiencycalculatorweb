import React, {Component} from 'react';
import {Grid, Row, Col, Image, Panel, PanelGroup} from 'react-bootstrap'
//import logo from '../../img/brightness.png';
import logo from '../../img/bladeSketch copy.svg';
import configurationsketch from '../../img/configurationSketch.png'

class Explanation extends Component {

    render() {
        return (
            <div className="Explanation">
                    <Row >
                            <PanelGroup accordion id="accordion-example">

                                <Panel eventKey="1" bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>Introduction</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>
                                        The Detector Efficiency Calculator (DECal) is a series of Python functions and
                                        tools designed to analytically calculate, visualise and optimise the detection
                                        efficiency of thermal neutron detectors, which are based on thin-film
                                        converters.
                                        The implementation presented in this software concerns 10B-based detectors in
                                        particular. The source code is openly available to interested users via a
                                        GitHub repository.
                                    </Panel.Body>
                                </Panel>


                                <Panel eventKey="2" bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title toggle>Detector geometry and neutron beam
                                            configuration</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>{/*collapsible*/}
                                    <p>
                                        A detector can be made of a single or <b>multiple layers</b>. A layer consists
                                        of a <b>substrate material</b>, usually Aluminium, on which the 10B4C  converter  is
                                        coated, either on one or both sides. A double-coated layer is referred to as
                                        blade.
                                        The number of converter layers, their thickness and their composition matter.
                                        In addition, a detector can contain layers of the same or varying converter
                                        thickness. This parameter can be optimised accordingly for a single neutron
                                        wavelength or for a distribution of neutron wavelengths, a scenario which is
                                        closer to reality in a neuron scattering instrument. The material and thickness
                                        of the substrate are not considered in the calculations presented here and will
                                        be the topic of a future improvement.
                                        The incoming neutrons can enter this geometrical arrangement at an angle
                                        or perpendicularly, depending on the needs of the application (see Fig. 1). Both
                                        the neutron incident angle and its wavelength (energy) a ect the eciency and
                                        thus enter the respective calculation function.
                                        summarizes all parameters that impact the detection eciency. The
                                        neutron beam hits the detector with an incident angle &Theta;. A numbered series
                                        of
                                        layers follow. A layer is called back-scattering when neutrons are incident from
                                        the gas-converter interface and the escaping particles are emitted backwards
                                        into
                                        the gas volume; it is called a transmission layer when neutrons are incident
                                        from
                                        the substrate-converter interface and the escaping fragments are emitted in the
                                        forward direction in the sensitive volume. In Fig. 1 the detection eciency of
                                        every blade is the sum of the back-scattering and transmission layer eciencies,
                                        as the substrate holds two converter layers, one in back-scattering mode and
                                        one in transmission mode.
                                        </p>
                                        <Image src="https://project.esss.dk/owncloud/index.php/s/PM9qD4T3XR7bOAr"/>
                                       <div> <Image src={logo} responsive className="brightnessImg"/></div>
                                    </Panel.Body>
                                </Panel>

                            </PanelGroup>

                    </Row>
            </div>
    );
    }
    }


    export default Explanation;