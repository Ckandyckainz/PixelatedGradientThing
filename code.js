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
    }
    increase(){
        if (this.c+this.ci*this.cdir>1) {
            this.c = 1-this.ci;
            this.cdir = -1;
        } else {
            if (this.c+this.ci*this.cdir<0){
                this.c = this.ci-this.c;
                this.cdir = 1;
            } else {
                this.c += this.ci*this.cdir;
            }
        }
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
    for (let i=0; i<3; i++) {
        let ci = new CI(0, 2**(Math.random()*6-3)/(2*pixels-1), 1);
        cis.push(ci);
    }
    for (let i=0; i<pixels; i++) {
        cis.forEach((ci)=>{
            ci.increase();
        });
        mctx.fillStyle = colorString(cis[0].c, cis[1].c, cis[2].c, 1);
        for (let j=0; j<i+1; j++) {
            mctx.fillRect(j*ss, (i-j)*ss, ss+1, ss+1);
        }
    }
    for (let i=1; i<pixels; i++) {
        cis.forEach((ci)=>{
            ci.increase();
        });
        mctx.fillStyle = colorString(cis[0].c, cis[1].c, cis[2].c, 1);
        for (let j=0; j<pixels-i; j++) {
            mctx.fillRect((i+j)*ss, (pixels-1-j)*ss, ss+1, ss+1);
        }
    }
}
generateButton.addEventListener("click", generateButtonClicked);