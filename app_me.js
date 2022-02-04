const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "#000";
ctx.lineWidth = 10;
// .strokeRect(75, 140, 150, 110);


let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}


function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting){ // 클릭하지 않고 움직였을 때
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{ // 클릭하고 움직였을때
        console.log('creating path' + x +" "+ y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(e){
    painting = true;
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    //canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}