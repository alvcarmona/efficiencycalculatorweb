import React, {Component} from 'react';
//import SiriWave from './siriwave'
//Check for animations: https://gist.github.com/gkhays/e264009c0832c73d5345847e673a64ab
// https://codepen.io/vasilly/pen/NRKyWL
class Sketch extends Component {
    constructor(){
        super()
         this.state = { step: 0 };
         this.dibujar = this.dibujar.bind(this);
    }

    componentDidMount() {
        this.dibujar();
      }

    dibujar() {
        console.log('dibujar')
        let canvas = document.getElementById("plano");
        //document.getElementById("plano").width+=0;
        const blades = this.props.blades
        const angle = this.props.angle
        Math.radians = function (degrees) {
            return degrees * Math.PI / 180;
        };
        if (canvas && canvas.getContext) {
            drawInCanvas();

            function drawInCanvas() {
                let ctx = canvas.getContext("2d");
                let s = getComputedStyle(canvas);
                let w = s.width;
                let h = s.height;
                canvas.width = w.split("px")[0];
                canvas.height = h.split("px")[0];
                const toy = canvas.height / 2
                const tox = canvas.width / 3
                const fromy = calculateInitialYBeam(tox, toy, angle)
                drawBeam(ctx, 0, fromy, tox, toy);
                drawBlades(ctx, canvas.width, canvas.height, blades.length, 90);
                ///drawAnimatedBeam(ctx, 0, fromy, tox, toy)
            }

            function calculateInitialYBeam(tox, toy, angle) {
                return toy - Math.tan(Math.radians(90 - angle)) * (tox);
            }

            function drawBeam(ctx, fromx, fromy, tox, toy) {
                const headlen = 10;
                const angle = Math.atan2(toy - fromy, tox - fromx);
                //starting path of the arrow from the start square to the end square and drawing the stroke
                ctx.beginPath();
                ctx.moveTo(fromx, fromy);
                ctx.lineTo(tox, toy);
                ctx.strokeStyle = "#cc0000";
                ctx.lineWidth = 5;
                ctx.stroke();
                //starting a new path from the head of the arrow to one of the sides of the point
                ctx.beginPath();
                ctx.moveTo(tox, toy);
                ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
                //path from the side point of the arrow, to the other side point
                ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
                //path from the side point back to the tip of the arrow, and then again to the opposite side point
                ctx.lineTo(tox, toy);
                ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
                //draws the paths created above
                ctx.strokeStyle = "#cc0000";
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.fillStyle = "#cc0000";
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.save();
            }

            function getBladeProportions(x, y, angle, blades) {
                const container = document.getElementById("plano")
                const detectorSpace = (x / 3) * 2
                let maxBladespace = detectorSpace / blades
                if (maxBladespace > 70) maxBladespace = 70
                const bDistance = (maxBladespace / 3) * 2
                const bwidth = maxBladespace - bDistance
                const initialX = x / 3
                const initialY = y / 6
                const height = y * 2 / 3
                const rotation = 0
                return {
                    margin: bDistance,
                    initialX: initialX,
                    initialY: initialY,
                    thick: bwidth,
                    height: height,
                    rotation: rotation
                }
            }

            function drawBlade(ctx2, initialX, initialY, rotation, thick, height) {
                //Blade converter proportions
                const converterThick = thick / 4
                const substrateThick = thick - converterThick
                ctx2.strokeStyle = "#000000";
                ctx2.translate(initialX, initialY);
                ctx2.rotate(rotation);
                //BackScattering layer
                ctx2.fillStyle = "black";
                ctx2.fillRect(0, 0, converterThick, height);
                //substrate layer
                ctx2.fillStyle = "#abc5d1";
                ctx2.fillRect(converterThick, 0, substrateThick, height)
                //transmission layer
                ctx2.fillStyle = "black";
                ctx2.fillRect(converterThick + substrateThick, 0, converterThick, height)
                ctx2.restore()
                ctx2.save();
            }

            function drawBlades(ctx2, x, y, blades, angle) {
                let i = 0
                let proportions = getBladeProportions(x, y, angle, blades)
                let canvas = document.getElementById("plano");
                ctx2 = canvas.getContext("2d");
                console.log("blade draw")
                for (; i < blades; i++) {
                    drawBlade(ctx2, proportions.initialX, proportions.initialY, proportions.rotation, proportions.thick, proportions.height)
                    proportions.initialX = proportions.margin + proportions.thick + proportions.initialX
                }
            }

            function drawPoint(ctx, y) {
            var radius = 3;
            ctx.beginPath();

            // Hold x constant at 4 so the point only moves up and down.
            ctx.arc(4, y, radius, 0, 2 * Math.PI, false);

            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }

            function plotSine(ctx, xOffset, yOffset) {
                var width = ctx.canvas.width;
                var height = ctx.canvas.height;
                var scale = 20;
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgb(66,44,255)";
                // console.log("Drawing point...");
                // drawPoint(ctx, yOffset+step);

                var x = 4;
                var y = 0;
                var amplitude = 40;
                var frequency = 20;
                //ctx.moveTo(x, y);
                ctx.moveTo(x, 50);
                while (x < width) {
                    y = height / 2 + amplitude * Math.sin((x + xOffset) / frequency);
                    ctx.lineTo(x, y);
                    x++;
                    // console.log("x="+x+" y="+y);
                }
                ctx.stroke();
                ctx.save();
                console.log("Drawing point at y=" + y);
                drawPoint(ctx, y);
                ctx.stroke();
                ctx.restore();
            }

            function drawAnimatedBeam(ctx, fromx, fromy, tox, toy, wavelength, amplitude) {
                function draw() {
                    let canvas = document.getElementById("plano");
                    let context = canvas.getContext("2d");

                    context.clearRect(0, 0, 500, 500);
                    context.save();
                    plotSine(context, this.state.step, 50);
                    context.restore();
                    this.setState({  state:this.state+4 })
                }

                function plotSine(ctx) {
                    var width = ctx.canvas.width;
                    var height = ctx.canvas.height;
                    var scale = 20;

                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "rgb(66,44,255)";

                    var x = 0;
                    var y = 0;
                    var amplitude = 40;
                    var frequency = 20;
                    //ctx.moveTo(x, y);
                    while (x < width) {
                        y = height/2 + amplitude * Math.sin(x/frequency);
                        ctx.lineTo(x, y);
                        x = x + 1;
                    }
                    ctx.stroke();
                }

                draw(4)
                console.log('debugme')



                const headlen = 10;
                const angle = Math.atan2(toy - fromy, tox - fromx);
                //starting path of the arrow from the start square to the end square and drawing the stroke
                ctx.beginPath();
                ctx.moveTo(fromx, fromy);
                ctx.lineTo(tox, toy);
                ctx.strokeStyle = "#cc0000";
                ctx.lineWidth = 5;
                ctx.stroke();
                //starting a new path from the head of the arrow to one of the sides of the point
                ctx.beginPath();
                ctx.moveTo(tox, toy);
                ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
                //path from the side point of the arrow, to the other side point
                ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
                //path from the side point back to the tip of the arrow, and then again to the opposite side point
                ctx.lineTo(tox, toy);
                ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
                //draws the paths created above
                ctx.strokeStyle = "#cc0000";
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.fillStyle = "#cc0000";
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.save();
            }
        }
    }

    componentDidUpdate() {
        this.dibujar()
    }

    render() {
        return (
            <div className='sketch'>
                <canvas id="plano">
                    Este texto se muestra para los navegadores no compatibles con canvas.
                    Por favor, utiliza Firefox, Chrome, Safari u Opera.
                </canvas>
            </div>
        )
    }
};


class SketchContainer extends Component {
    componentWillReceiveProps() {
        console.log('props container')
        this.forceUpdate()
    }

    componentDidMount() {
        window.addEventListener("resize", this.forceUpdate());
    }

    render() {
        if (this.props.detector.blades) {
            return (
                <Sketch angle={this.props.detector.angle} blades={this.props.detector.blades}/>
            )
        } else {
            return (<div>No blades</div>)
        }

    }
};

export default SketchContainer;