let mc = document.getElementById("maincanvas");
let mctx = mc.getContext("2d");
let generateButton = document.getElementById("generatebutton");
let pixelInput = document.getElementById("pixelinput");
let mcw = 0;
if (window.innerWidth > window.innerHeight) {
    mcw = window.innerHeight*0.9;
} else {
    mcw = window.innerWidth*0.9;
}
let mch = mcw;
mc.width = mcw;
mc.height = mch;

let pic = 0;

class CI{
    constructor(){
        this.co = Math.random();
        this.cio = 2**(Math.random()*6-3);
        this.cdiro = randomBetween(0, 2, 1)*2-1;
        this.c = this.co;
        this.ci = this.cio;
        this.cdir = this.cdiro;
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
        this.c = this.co;
        this.ci = this.cio;
        this.cdir = this.cdiro;
        this.array = [];
        for (let i=0; i<pixels*2-1; i++) {
            this.array.push(this.increase(pixels));
        }
        return this.array;
    }
}

class Pic{
    constructor(){
        this.pixels = randomBetween(10, 101, 1);
        this.cis = [];
        for (let i=0; i<6; i++) {
            let ci = new CI();
            ci.generateArray(this.pixels);
            this.cis.push(ci);
        }
    }
    generate(){
        mctx.fillStyle = "#000000ff";
        mctx.fillRect(0, 0, mcw, mch);
        let ss = mcw/this.pixels;
        for (let i=0; i<this.pixels; i++) {
            for (let j=0; j<this.pixels; j++) {
                let r = (this.cis[0].array[i+j]+this.cis[3].array[this.pixels-1-i+j])/2;
                let g = (this.cis[1].array[i+j]+this.cis[4].array[this.pixels-1-i+j])/2;
                let b = (this.cis[2].array[i+j]+this.cis[5].array[this.pixels-1-i+j])/2;
                mctx.fillStyle = colorString(r, g, b, 1);
                mctx.fillRect(i*ss, j*ss, ss+1, ss+1);
            }
        }
        pixelInput.value = this.pixels;
    }
    refresh(){
        this.pixels = pixelInput.value;
        if (this.pixels == 7) {
            this.pixels = Math.floor(mcw);
        }
        this.cis.forEach((ci)=>{
            ci.generateArray(this.pixels);
        });
        this.generate();
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
    pic = new Pic();
    pic.generate();
}
generateButton.addEventListener("click", generateButtonClicked);
function refreshPic(){
    pic.refresh();
}
pixelInput.addEventListener("input", refreshPic);