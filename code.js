let mc = document.getElementById("maincanvas");
let mctx = mc.getContext("2d");
let generateButton = document.getElementById("generatebutton");
let mcw = 0;
if (window.innerWidth > window.innerHeight) {
    mcw = window.innerHeight*0.9;
} else {
    mcw = window.innerWidth*0.9;
}
let mch = mcw;
mc.width = mcw;
mc.height = mch;

class CI{
    constructor(c, ci, cdir){
        this.c = c;
        this.ci = ci;
        this.cdir = cdir;
        this.array = [];
    }
    increase(pixels){
        if (this.c+this.ci*this.cdir/(2*pixels-1)>1) {
            this.c = 1-this.ci/(2*pixels-1);
            this.cdir = -1;
        } else {
            if (this.c+this.ci*this.cdir/(2*pixels-1)<0){
                this.c = this.ci/(2*pixels-1)-this.c;
                this.cdir = 1;
            } else {
                this.c += this.ci*this.cdir/(2*pixels-1);
            }
        }
        return this.c;
    }
    generateArray(pixels){
        this.array = [];
        for (let i=0; i<pixels*2-1; i++) {
            this.array.push(this.increase(pixels));
        }
        return this.array;
    }
}

function randomBetween(min, max, precision){
    return Math.floor((Math.random()*(max-min)+min)/precision)*precision;
}

function colorString(r, g, b, a){
    r = Math.floor(r*255)*256*256*256;
    g = Math.floor(g*255)*256*256;
    b = Math.floor(b*255)*256;
    a = Math.floor(a*255);
    return "#"+(r+g+b+a).toString(16).padStart(8, "0");
}

function generateButtonClicked(){
    mctx.fillStyle = "#000000ff";
    mctx.fillRect(0, 0, mcw, mch);
    let pixels = randomBetween(10, 101, 1);
    let ss = mcw/pixels;
    let cis = [];
    for (let i=0; i<6; i++) {
        let ci = new CI(Math.random(), 2**(Math.random()*6-3), randomBetween(0, 2, 1)*2-1);
        ci.generateArray(pixels);
        cis.push(ci);
    }
    for (let i=0; i<pixels; i++) {
        for (let j=0; j<pixels; j++) {
//            r = cis[0].array[i+j];
//            g = cis[1].array[i+j];
//            b = cis[2].array[i+j];
            r = (cis[0].array[i+j]+cis[3].array[pixels-1-i+j])/2;
            g = (cis[1].array[i+j]+cis[4].array[pixels-1-i+j])/2;
            b = (cis[2].array[i+j]+cis[5].array[pixels-1-i+j])/2;
            mctx.fillStyle = colorString(r, g, b, 1);
            mctx.fillRect(i*ss, j*ss, ss+1, ss+1);
        }
    }
}
generateButton.addEventListener("click", generateButtonClicked);