/**
 contains a Route. Again, this goes down the path of breaking things down into as many small components as possible.
 I would recommend this (as oppoesd to having a route hierarchy written in XML) as it allows you to instantiate
 routes only as you need them. This also means that your route file will only including other files in relative
 sub-directories, which feels nice and de-coupled.
 Your route file can then also be the guardian of the data in your store when you go to the route, by making use of the
 onEnter and onLeave methods. In here you can dispatch fetch actions that ensure that your components have the data
 they need. This is really useful when you have deep nested routes.
 */

import Detectors from "./containers/detectors";
import DetectorDetailRoute from "../detectorDetail";
export default class DetectorList {
  constructor () {
    this.path = "detector";
    this.projectDetailRoute = new ProjectDetailRoute();
  }
  getChildRoutes (state, cb) {
    cb(null, [this.detectorDetailRoute]);
  }
  getComponents (cb) {
    cb(null, ProjectTasks);
  }
  onEnter () {
    this.fetchDetectors();
  }
  fetchDetectors () {

  }
}