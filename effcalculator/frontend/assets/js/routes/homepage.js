/**
 * Created by alvarocbasanez on 13/07/17.
 */

import React, {Component} from 'react';
import {Grid, Row, Col, Image, Button} from 'react-bootstrap'
import logo from '../../img/brightness.png';
import logo2 from '../../img/ESS_Logo_Frugal_Blue_cmyk.png';

class Homepage extends Component {

    render() {
        return (
            <div className="Homepage">
                <Grid className="homepage-container">
                    <Row className="bg-image">
                        <div className="header-content">
                            <h2 className="homepageHeader">Calculate | Optimize | Visualize</h2>
                            <h2 className="homepageHeader">Neutron detector configurations</h2>
                            <Button id="header-button">Start Here.</Button>
                        </div>
                    </Row>
                    <Row className="spacerHome-alt">

                        <Row className="description">
                            <Col md={12}>
                                <h4 className="skills">
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
                                </h4>

                            </Col>
                        </Row>
                        <Row className="githubSection">

                            <a href="https://github.com/alvcarmona/efficiencycalculatorweb">
                                <img src={"https://www.aha.io/assets/github.7433692cabbfa132f34adb034e7909fa.png"}
                                     width="150"/>
                            </a>
                            <h4>View project on github</h4>
                        </Row>

                    </Row>
                     <Row  className="spacerHome">
                        <Row className="description">
                            <Col md={3} sm={3} xs={2}>
                                <div className="center-parent">
                                    <a className="center-child" href="https://europeanspallationsource.se/">
                                        <Image
                                            src='http://project.esss.dk/owncloud/index.php/s/LyMCLBQ6uwe0CeV/download'
                                            responsive className="brightnessImg"/>
                                    </a>
                                </div>
                            </Col>
                            <Col md={8} sm={7} xs={7}>
                                <h5 className="skills">
                                    The European Spallation Source
                                    The European Spallation Source (ESS) is a European Research Infrastructure
                                    Consortium
                                    (ERIC), a multi-disciplinary research facility based on the world’s most powerful
                                    neutron source. The unique capabilities of this new facility will both greatly
                                    exceed
                                    and complement those of today's leading neutron sources, enabling new opportunities
                                    for
                                    researchers across the spectrum of scientific discovery, including life sciences,
                                    energy, environmental technology, cultural heritage and fundamental physics.
                                </h5>
                            </Col>
                        </Row>
                    </Row>
                     <Row className="spacerHome-alt">

                        <Row className="description">

                            <Col md={8} sm={7} xs={7}>
                                <h5>BrightnESS is a European Union-funded project within the European Commission’s
                                    Horizon
                                    2020 Research and Innovation programme in support of the European Spallation Source
                                    (ESS), a partnership of several European nations working together to build the
                                    world’s
                                    next-generation neutron science facility. Read more about ESS.
                                    The BrightnESS programme is designed to ensure that key challenges are met in order
                                    to
                                    build an ESS that can deliver high-impact scientific and technological
                                    knowledge.</h5>
                            </Col>
                            <Col md={3} sm={3} xs={2}>
                                <div className="brightness">
                                    <a className="center-child" href="https://brightness.esss.se/">
                                        <Image src={logo} responsive className="brightnessImg"/>
                                    </a>
                                </div>
                                 </Col>
                        </Row>
                </Row>
                </Grid>
            </div>
        );
    }
}


export default Homepage;