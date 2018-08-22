import React, {Component} from 'react';

class Sketch extends Component {
     dibujar() {
        console.log('dibujar')
        let canvas = document.getElementById("plano");
        //document.getElementById("plano").width+=0;
        const blades= this.props.blades
        const angle = this.props.angle
         Math.radians = function(degrees) {
              return degrees * Math.PI / 180;
            };
        if (canvas && canvas.getContext ) {
            drawInCanvas();
            function drawInCanvas() {
                let ctx = canvas.getContext("2d");
                let s = getComputedStyle(canvas);
                let w = s.width;
                let h = s.height;
                canvas.width = w.split("px")[0];
                canvas.height = h.split("px")[0];
                const toy=canvas.height/2
                const tox = canvas.width/ 3
                const fromy =calculateInitialYBeam(tox,toy,angle)
                drawBeam(ctx,0,fromy, tox, toy);
                drawBlades(ctx, canvas.width, canvas.height, blades.length, 90);
            }

            function calculateInitialYBeam(tox,toy, angle){
                return  toy - Math.tan(Math.radians(90-angle))*(tox);
            }

            function drawBeam(ctx, fromx, fromy, tox, toy) {
                const headlen = 10;
                const  angle = Math.atan2(toy-fromy,tox-fromx);
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
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                //path from the side point of the arrow, to the other side point
                ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
                //path from the side point back to the tip of the arrow, and then again to the opposite side point
                ctx.lineTo(tox, toy);
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                //draws the paths created above
                ctx.strokeStyle = "#cc0000";
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.fillStyle = "#cc0000";
                ctx.fill();
                ctx.lineWidth = 1;
                ctx.save();
            }

            function getBladeProportions( x, y, angle, blades) {
                const detectorSpace = (x/3)*2
                let maxBladespace = detectorSpace/blades
                if (maxBladespace>70) maxBladespace=70
                const bDistance = (maxBladespace/3)*2
                const bwidth = maxBladespace -bDistance
                const initialX = x / 3
                const initialY = y / 6
                const height =  y*2 / 3
                const rotation = 0
                return {margin:bDistance, initialX:initialX,initialY:initialY,thick:bwidth,height:height,rotation:rotation}
            }

            function drawBlade(ctx2,initialX,initialY,rotation,thick,height){
                    console.log("debug me")
                    //Blade converter proportions
                    const converterThick = thick/4
                    const substrateThick = thick-converterThick

                    ctx2.strokeStyle = "#000000";
                    ctx2.translate(initialX, initialY);
                    ctx2.rotate(rotation);
                    //BackScattering layer
                    ctx2.fillStyle="black";
                    ctx2.fillRect(0, 0, converterThick,height);
                    //substrate layer
                    ctx2.fillStyle="#abc5d1";
                    ctx2.fillRect(converterThick, 0, substrateThick,height)
                    //transmission layer
                    ctx2.fillStyle="black";
                    ctx2.fillRect(converterThick+substrateThick, 0, converterThick,height)
                    ctx2.restore()
                    ctx2.save();
                    }

            function drawBlades(ctx2, x, y, blades, angle) {
                let i = 0
                let proportions = getBladeProportions( x, y, angle, blades)
                let canvas = document.getElementById("plano");
                ctx2 = canvas.getContext("2d");
                console.log("blade draw")
                for (; i < blades; i++) {
                    drawBlade(ctx2,proportions.initialX,proportions.initialY,proportions.rotation,proportions.thick,proportions.height)
                    proportions.initialX = proportions.margin + proportions.thick + proportions.initialX
                }
            }
        }
    }
    componentDidMount(){
        this.dibujar()
    }
    componentDidUpdate(){
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
   componentWillReceiveProps(){
       console.log('props container')
        this.forceUpdate()
    }
    render(){
         if(this.props.detector.blades){
        return (
                <Sketch angle={this.props.detector.angle} blades={this.props.detector.blades}/>
        )
    }else{
        return(<div>No blades</div>)
    }

    }
};

export default SketchContainer;