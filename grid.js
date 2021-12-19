let leftcol = document.querySelector(".left_col");
let toprow = document.querySelector(".top_row");
let grid=document.querySelector(".grid");
let addressinput=document.querySelector(".address-input");
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let left=document.querySelector(".left");
let center=document.querySelector(".center");
let right=document.querySelector(".right");
let fontelem=document.querySelector(".font-size");
let fontsty=document.querySelector(".font-family");
let formulabar=document.querySelector(".formula-input");
let rows = 100;
let cols=26;
for(let i=0; i<rows; i++){
    let colbox = document.createElement("div");
    colbox.innerText = i + 1;
    colbox.setAttribute("class","box");
    leftcol.appendChild(colbox);
}
for(let i=0; i< cols;i++){
    let cell=document.createElement("div");
    cell.innerText = String.fromCharCode(65 + i);
    cell.setAttribute("class","cell");
    toprow.appendChild(cell);
}
for(let i=0; i < rows; i++){
    let row= document.createElement("div");
    row.setAttribute("class","row");
    for(let j=0; j<cols; j++){
        let cell= document.createElement("div");
        //cell.innerText = `${String.fromCharCode( 65 + j )} ${i+1}`
        cell.setAttribute("class","cell");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        cell.setAttribute("contenteditable","true");
        row.appendChild(cell);
    }
    grid.appendChild(row);
}
let btnContainer = document.querySelector(".add-sheet_btn-container");
let sheetList = document.querySelector(".sheet-list");
let firstSheet = document.querySelector(".sheet"); 
let sheetdb;
let sheetarray=[];
firstSheet.addEventListener("click", handleSheet)
firstSheet.click();


// day 1 is
btnContainer.addEventListener("click", function () {
    // create sheet let document.querySelectorAll(".sheet");
        let AllSheets = document.querySelectorAll(".sheet");
        let lastSheet = AllSheets[AllSheets.length - 1]; 
        let Lastidx = lastSheet.getAttribute("idx");
        Lastidx = Number(Lastidx); 
        let Newsheet = document.createElement("div");
        Newsheet.setAttribute("class", "sheet"); 
        Newsheet.setAttribute("idx", `${Lastidx + 1}`);
        Newsheet.innerText = `Sheet ${Lastidx + 2}`;
        sheetList.appendChild(Newsheet);
        for (let i = 0; i < AllSheets.length; i++) {
         AllSheets[i].classList.remove("active");
        } 
        Newsheet.classList.add("active"); 
        // new sheet create
        createsheet();
        sheetdb=sheetarray[Lastidx+1];
        //new sheet will be created and will be active
        Newsheet.addEventListener("click", handleSheet)
    })
function handleSheet (e) {
    // evnt listener add
        let sheet = e.currentTarget; 
        let AllSheets = document.querySelectorAll(".sheet");
        for (let i= 0; i < AllSheets.length; i++) {
        AllSheets[i].classList.remove("active"); 
        }
        sheet.classList.add("active");
        let idx= sheet.getAttribute("idx");
        if(!sheetarray[idx]){
            createsheet();
        }
        sheetdb=sheetarray[idx];
        setui();
    }
function createsheet(){
let newdb=[];
for(let i=0;i<rows;i++){
    let row=[];
    for(let j=0; j< cols; j++){
        let cell={
            bold:"normal",
            italic:"normal",
            underline:"none",
            hAlign:"center",
            fontFamily:"sans-serif",
            fontSize:"16",
            color: "black",
            bColor: "none",
            value:"",
            formula:"",
            children: []
        
        }
        let elem=document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
        elem.innerText="";
        row.push(cell);
    }
    newdb.push(row);
}
sheetarray.push(newdb);
}
function setui(){
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                let elem=document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
                let value= sheetdb[i][j].value;
                elem.innerText=value;
            }
        }
    }
    





let allcells=document.querySelectorAll(".grid .cell");
//event listener (when you click that gets printed )
for(let i=0; i < allcells.length; i++){
    allcells[i].addEventListener("click", function() {
    let rid = allcells[i].getAttribute("rid");
    let cid = allcells[i].getAttribute("cid");
    rid = Number(rid);
    cid = Number(cid);
    let address = `${String.fromCharCode(65 + cid)}${rid + 1}` ;
    addressinput.value=address;
    let cellobj = sheetdb[rid][cid];


    if(cellobj.bold == "bold"){
        bold.classList.add("active-btn");
    }
    else{
        bold.classList.remove("active-btn");
    }
    if(cellobj.italic == "italic"){
        italic.classList.add("active-btn");
    }
    else{
        italic.classList.remove("active-btn");
    }
    if(cellobj.underline == "underline"){
        underline.classList.add("active-btn");
    }
    else{
        underline.classList.remove("active-btn");
    }
    if(cellobj.formula){
        formulabar.value= cellobj.formula;
    }
    else{
        formulabar.value="";
    }
    if(cellobj.left == "left"){
        left.classList.add("active-btn");
    }
    else{
        left.classList.remove("active-btn");
    }
    if(cellobj.right == "right"){
        right.classList.add("active-btn");
    }
    else{
        right.classList.remove("active-btn");
    }








    })
}
sheetarray.push(sheetdb);
allcells[0].click();








function finduielem(){
    let address=addressinput.value;
    let ricidobj = getridcidaddress(address);
    let rid= ricidobj.rid;
    let cid=ricidobj.cid;
    let uicellelem=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    return uicellelem;
}
function getridcidaddress(address){
    let cid = Number(address.charCodeAt(0))-65;
    let rid = Number(address.slice(1))-1;
    return {"rid": rid, "cid":cid};
}


/*bold italic underline alignment height*/

bold.addEventListener("click",function(){
    let uicellelem=finduielem();
    let cid=uicellelem.getAttribute("cid");
    let rid=uicellelem.getAttribute("rid");
    let cellobj= sheetdb[rid][cid];
    if(cellobj.bold=="normal"){
        cellobj.bold="bold";
        bold.classList.add("active-btn");
        uicellelem.style.fontWeight="bold";
    }
    else{
        cellobj.bold="normal";
        bold.classList.remove("active-btn");
        uicellelem.style.fontWeight="normal";
    }
})
italic.addEventListener("click",function(){
    let uicellelem=finduielem();
    let cid=uicellelem.getAttribute("cid");
    let rid=uicellelem.getAttribute("rid");
    let cellobj= sheetdb[rid][cid];
    if(cellobj.italic=="normal"){
        cellobj.italic="italic";
        italic.classList.add("active-btn");
        uicellelem.style.fontStyle="italic";
    }
    else{
        cellobj.italic="normal";
        italic.classList.remove("active-btn");
        uicellelem.style.fontStyle="normal";
    }
})
underline.addEventListener("click",function(){
    let uicellelem=finduielem();
    let cid=uicellelem.getAttribute("cid");
    let rid=uicellelem.getAttribute("rid");
    let cellobj= sheetdb[rid][cid];
    if(cellobj.underline=="none"){
        cellobj.underline="underline";
        underline.classList.add("active-btn");
        uicellelem.style.textDecoration="underline";    
    }
    else{
        cellobj.underline="none";
        underline.classList.remove("active-btn");
        uicellelem.style.textDecoration="none";
    }
    
})

left.addEventListener("click",function(){
    let uicellelem=finduielem();
    let cid=uicellelem.getAttribute("cid");
    let rid=uicellelem.getAttribute("rid");
    let cellobj= sheetdb[rid][cid];
    if(cellobj.left=="center"){
        cellobj.left="left";
        left.classList.add("active-btn");
        uicellelem.style.textAlign="left";
    }
    else{
        cellobj.left="center";
        left.classList.remove("active-btn");
        uicellelem.style.textAlign="center";
    }
    
})
center.addEventListener("click",function(){
    let uicellelem=finduielem();
    uicellelem.style.textAlign="center";
})
right.addEventListener("click",function(){
    let uicellelem=finduielem();
    let cid=uicellelem.getAttribute("cid");
    let rid=uicellelem.getAttribute("rid");
    let cellobj= sheetdb[rid][cid];
    if(cellobj.right=="center"){
        cellobj.right="right";
        right.classList.add("active-btn");
        uicellelem.style.textAlign="right";
    }
    else{
        cellobj.right="center";
        right.classList.remove("active-btn");
        uicellelem.style.textAlign="center";
    }
})
fontelem.addEventListener("change",function(){
    let val=fontelem.value;
    let uicell = finduielem();
    uicell.style.fontSize= val + "px";

})
fontsty.addEventListener("change",function(){
    let val=fontsty.value;
    let uicell = finduielem();
    uicell.style.fontFamily= val ;

})

