/**
 * Created by alvarocbasanez on 18/07/17.
 */
var React = require('react');
var Masonry = require('react-masonry-component');
import {Jumbotron, Col} from 'react-bootstrap'
import Detector from './Detector'
var masonryOptions = {
    transitionDuration: '0.5s',
    gutter: 10
};

var Gallery = React.createClass({
    render: function () {
        var childElements = this.props.detectors.map(u => {
                  return (
                      <Col xs={4} md={3}>
                          <div key={u.id}>

                              <Detector
                                  id={u.id}
                                  name={u.name}
                                  single={u.single}
                                  threshold={u.threshold}
                                  angle={u.angle}
                              />
                          </div>
                      </Col>
                  );
              });
        childElements.push(<Jumbotron>
                          <div className="masonryElement">
                              <p>create new detector</p>
                          </div>
            </Jumbotron>);

        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >
                {childElements}
            </Masonry>
        );
    }
});

export default  Gallery;