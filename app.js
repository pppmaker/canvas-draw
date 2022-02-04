const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorBar = document.getElementById('colorBar');
const colorArray = new Array('#9CE673','#67F0ED','#7E6CD9','#F06C92','#EBB36A','#4c4c4c','#066c99','#ffffff');
const range = document.getElementById('points');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITAIL_COLOR = '#000';
const CANVAS_SIZE = 500;


canvas.width = CANVAS_SIZE; // DOM에 직접적으로 w,h 입력
canvas.height = CANVAS_SIZE;

ctx.lineWidth = 5;
ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;


let paintStatus = false;
let filling = false;

function onMouseEnter(e){
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    if(paintStatus === true){
        ctx.lineTo(offsetX,offsetY);
        ctx.stroke();
    }else{
        ctx.beginPath(); // 새로 시작
        ctx.moveTo(offsetX, offsetY);
    }
}

function onMouseDown(){
    paintStatus = true;
}

function stopPaint(){
    paintStatus = false;
}

function createColors(){
    let makingTags = '';
    colorArray.forEach((colors,index) => {
        makingTags = makingTags + '<div class="color" style="background-color:'+colors+'" onclick="selectColor('+index+');"></div>';
    });
    colorBar.innerHTML = makingTags;
}

function selectColor(colorIndex){
    const onColor = colorArray[colorIndex];
    ctx.strokeStyle = onColor;
    ctx.fillStyle = onColor;
}

function changeLineWidth(){
    ctx.lineWidth = this.value;
}

if(mode){
    mode.addEventListener('click', handleMoreClick);
}

if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}

function handleMoreClick(){
    if(filling === true){
        filling = false;
        mode.innerText = 'Fill';
    }else{
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){  // 마우스 우클릭 금지
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'sample_img'
    link.click();
}


async function downloadCanvas(el) {
    const imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
};

function init(){
    createColors();
}
init();

canvas.addEventListener("mousemove",onMouseEnter);
canvas.addEventListener("mousedown",onMouseDown);
canvas.addEventListener("mouseup",stopPaint);
canvas.addEventListener("mouseleave",stopPaint);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", handleCM);
range.addEventListener("change", changeLineWidth);
