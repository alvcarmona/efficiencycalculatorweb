/**
 * Created by alvarocbasanez on 13/07/17.
 */

import React, {Component} from 'react';
import {Grid, Row, Col, Image} from 'react-bootstrap'
import logo from '../../img/brightness.png';
import logo2 from '../../img/ESS_Logo_Frugal_Blue_cmyk.png';

class Homepage extends Component {

    render() {
        return (
            <div className="Homepage">
                <Grid>
                    <Row>
                        <h2 className="homepageHeader">Neutron detector efficiency calculator (DECal)</h2>
                    </Row>
                     <div className="spacerHome">
                    <Row>
                        <Col xs={7}  smOffset={2} xsOffset={1}>
                            <p className="skills">
                                DECal is a series of python scripts designed to analytically calculate, visualize
                                and
                                optimize
                                the detection efficiency
                                of thermal neutron detectors, which are based on thin-film converters. The
                                implementation
                                presented in
                                this web page concerns 10B-based detectors in particular. The source code is openly
                                available
                                to the interested users via a github repository.
                            </p>

                        </Col>


                    </Row>
                     </div>
                     <div className="spacerHome">
                    <Row><p>View project on github</p>
                            <a href="https://github.com/alvcarmona/efficiencycalculatorweb">
                                <img src={"https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png"}
                                     width="150"/>
                            </a></Row>
                     </div>
                 <div className="spacerHome">
                    <Row>
                        <Col xs={7} smOffset={2} xsOffset={1}>
                                <div>                                <a href="https://europeanspallationsource.se/">
                                    <Image src={logo2} className="brightnessImg"/>
                                </a>
                                    </div>

                            <p className="skills">
                                The European Spallation Source
                                The European Spallation Source (ESS) is a European Research Infrastructure Consortium
                                (ERIC), a multi-disciplinary research facility based on the world’s most powerful
                                neutron source. The unique capabilities of this new facility will both greatly exceed
                                and complement those of today's leading neutron sources, enabling new opportunities for
                                researchers across the spectrum of scientific discovery, including life sciences,
                                energy, environmental technology, cultural heritage and fundamental physics.
                            </p>
                        </Col>
                        </Row>
                     </div>
                     <div className="spacerHome">
                    <Row>
                        <Col xs={7} smOffset={2} xsOffset={1}>
                            <div className="brightness">
                                <a href="https://brightness.esss.se/">
                                    <Image src={logo} responsive className="brightnessImg"/>
                                </a>
                            </div>
                            <p>BrightnESS is a European Union-funded project within the European Commission’s Horizon
                                2020 Research and Innovation programme in support of the European Spallation Source
                                (ESS), a partnership of several European nations working together to build the world’s
                                next-generation neutron science facility. Read more about ESS.
                                The BrightnESS programme is designed to ensure that key challenges are met in order to
                                build an ESS that can deliver high-impact scientific and technological knowledge.</p>
                        </Col>
                    </Row>
                         </div>
                </Grid>
            </div>
        );
    }
}


export default Homepage;