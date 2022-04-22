import React from "react";
import NavBar from "../parts/NavBar";
import Sketch from "react-p5";

let canvas;
let fib;

class Fib {
    constructor() {
        this.number = [];
        this.x = [];
        this.y = [];
        this.col = [];

        this.resize = 0;
    }
    fibS(p5, n) {
        p5.rectMode(p5.CENTER);
        this.resize = 1;
        for (let i = 0; i < n; i++) {
            if (i <= 1){
                this.number[0] = 0;
                this.number[1] = 1;
            } 

            if (i > 1) this.number[i] = (this.number[i - 2]) + (this.number[i - 1]);

            switch (i % 4) {
                case 0: //左or零番目
                    if (i == 0) {
                        this.x[0] = this.y[0] = 0;
                    } else {
                        this.x[i] = this.x[i - 1] - (this.number[i] + this.number[i - 1]) / 2;
                        this.y[i] = this.y[i - 1] + (this.number[i] - this.number[i - 1]) / 2;
                    }
                    break;

                case 1: //下or基準
                    if (i == 1) {
                        this.x[1] = this.y[1] = 0; //<---
                    } else {
                        this.x[i] = this.x[i - 1] + (this.number[i] - this.number[i - 1]) / 2;
                        this.y[i] = this.y[i - 1] + (this.number[i] + this.number[i - 1]) / 2;
                    }
                    break;

                case 2: //右
                    this.x[i] = this.x[i - 1] + (this.number[i] + this.number[i - 1]) / 2;
                    this.y[i] = this.y[i - 1] - (this.number[i] - this.number[i - 1]) / 2;
                    break;

                case 3: //上
                    this.x[i] = this.x[i - 1] - (this.number[i] - this.number[i - 1]) / 2;
                    this.y[i] = this.y[i - 1] - (this.number[i] + this.number[i - 1]) / 2;
                    break;
            }
        }
    }

    fibD(p5, n) {
        p5.translate(p5.width / 2, p5.height / 2);
        if (this.resize > 50) this.resize = 50;
        if (this.resize < 5.791724706488976e-38) this.resize = 5.791724706488976e-38;
        for (let i = 0; i < n; i++) {
            p5.fill(0);
            p5.stroke(0, 125, 255);
            p5.strokeWeight(5);

            p5.rect(this.x[i] * this.resize, this.y[i] * this.resize, this.number[i] * this.resize, this.number[i] * this.resize);
        }   
        

    }
}

export default (props) => {
	const setup = (p5, canvasParentRef) => {
		canvas = p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        fib = new Fib();
        fib.fibS(p5, 200);
	};

	const draw = (p5) => {
        fib.fibD(p5, 200);
        fib.resize -= 1 / 75 * fib.resize;
	};

    const windowResized = (p5) => {
        canvas = p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    const mouseWheel = (p5, event) => {
        fib.resize -= event.delta / 1000 * fib.resize;
    }
	return (<>
                <NavBar/>
                <main style={{color: "black"}}>
                    <Sketch setup={setup} draw={draw} windowResized={windowResized} mouseWheel={mouseWheel}/>
                    <div className="plate">
                        <h1>404</h1>
                        <p>Not found...</p>
                        <p style={{borderBottom:"2px solid black"}}>This page might get caught in a fibonacci vortex.</p>
                    </div>
                </main>
            </>);
};