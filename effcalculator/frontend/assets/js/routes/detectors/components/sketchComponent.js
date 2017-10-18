import React, {Component} from 'react';

class Sketch extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let canvas = document.getElementById("plano");
        let X, Y;
        let blades= this.props.blades
        let angle = this.props.angle
        if (canvas && canvas.getContext ) {
            inicializarCanvas();

            function inicializarCanvas() {
                let ctx = canvas.getContext("2d");
                let s = getComputedStyle(canvas);
                let w = s.width;
                let h = s.height;
                canvas.width = w.split("px")[0];
                canvas.height = h.split("px")[0];
                X = canvas.width / 2;
                Y = canvas.height / 2;

                drawBeam(ctx, canvas.width, canvas.height)
                drawBlades(ctx, canvas.width, canvas.height, blades, angle)
            }

            function drawBeam(ctx, x, y) {
                console.log("Linea")
                //ctx.rotate(detector.angle*Math.PI/180)
                ctx.moveTo(x / 3, y / 2);
                ctx.lineTo(0, y / 2);
                ctx.strokeStyle = "#f00";
                ctx.stroke();
                //ctx.restore()
                ctx.save()
            }

            function drawBlades(ctx, x, y, blades, angle) {

                let initialX = x / 3
                let initialY = y / 4
                let thick = 7
                let height =  y / 2
                let margin = 10
                let rotation = (90 - angle) * Math.PI / 180
                let i = 0

                if(angle <= 10){
                    initialX = x / 3 +40
                    initialY = y / 4 + 45
                    thick = 4
                    margin = 40
                    height = y/5 *2
                }else if(angle <= 25 && angle > 10){
                    initialX = x / 3 +35
                    initialY = y / 4 + 30
                    thick = 4
                    margin = 30
                    height = y/3
                }else if(angle <= 40 && angle > 25){
                    initialX = x / 3 +45
                    initialY = y / 4 + 25
                    thick = 10
                    margin = 35
                    height = y/7 * 3
                }else if(angle <= 60 && angle > 40){
                    initialX = x / 3 +50
                    initialY = y / 4 +15
                }else if(angle <= 80 && angle > 60){
                    initialX = x / 3 +40
                    initialY = y / 4 +15
                    thick = 9
                    margin = 13
                }

                /*
                for (; i < detector.blades.length; i++) {
                     ctx.strokeStyle = "#000000";
                     ctx.strokeRect(initialX, initialY, thick, y/2);
                     initialX += margin+thick
                 }
                 */
                ctx.save();
                let canvas = document.getElementById("plano");
                let ctx2 = canvas.getContext("2d");
                ctx2.save();
                console.log("blade draw")

                for (; i < blades.length; i++) {
                    ctx2.save();
                    ctx2.strokeStyle = "#000000";
                    ctx2.translate(initialX, initialY);
                    ctx2.rotate(rotation);
                    ctx2.strokeRect(0, 0, thick,height);
                    ctx2.restore()

                    initialX = margin + thick + initialX
                }
                ctx2.save()
            }
        }
    }

    render() {
        return (
            <div className='sketch'>
                <canvas width="400" height="150" id="plano">
                    Este texto se muestra para los navegadores no compatibles con canvas.
                    Por favor, utiliza Firefox, Chrome, Safari u Opera.
                </canvas>
            </div>
        )
    }
};



class SketchContainer extends Component {
     constructor(props) {
        super(props);
    }

    render(){
         if(this.props.blades){
        return (
                <Sketch angle={this.props.angle} blades={this.props.blades}></Sketch>
        )
    }else{
        return(<div>No blades</div>)
    }

    }
};

export default SketchContainer;