for(let i=0;i<allcells.length;i++){

    //blur se purani value save hori h database mein
    allcells[i].addEventListener("blur",function(){
        let data= allcells[i].innerText;
        let address=addressinput.value;
        let rid = allcells[i].getAttribute("rid");
        let cid = allcells[i].getAttribute("cid");
        // let {rid,cid}=getridcidaddress(address);
        let cellobj=sheetdb[rid][cid];
        if(cellobj.value == data){
            return;
        }
        if(cellobj.value == data){
            return;
        }
        if(cellobj.formula){
            removeformula(cellobj,address);
            formulabar.value="";
        }
        cellobj.value=data;
        updatechild(cellobj);
    })
}

formulabar.addEventListener("keydown",function(e){
    if(e.key == "Enter" && formulabar.value){
        //user inputs formula
        let cformula=formulabar.value;
        let address = addressinput.value;
        let {rid,cid}=getridcidaddress(address);
        let cellobj = sheetdb[rid][cid];

        if(cformula != cellobj.formula){
            removeformula(cellobj,address); 
        }

        //formula mein get 
        let value=evaluateformula(cformula);
        //update ui/db
        setcell(value, cformula);
        setparentch(cformula,address);
        updatechild(cellobj);
    }
})
function evaluateformula(formula){
    let formulatokens= formula.split(" ");
    for(let i=0;i< formulatokens.length;i++){
        let ascii=formulatokens[i].charCodeAt(0);
        if(ascii >=65 && ascii<=90){
            let{rid,cid}=getridcidaddress(formulatokens[i]);
            let value= sheetdb[rid][cid].value;
            formulatokens[i]=value;
        }
    }
    let evaluatedformula = formulatokens.join(" ");
    return eval(evaluatedformula);
}
function setcell(value,formula){
    let uicellelem= finduielem();
    uicellelem.innerText=value;
    //database update
    let {rid,cid}=getridcidaddress(addressinput.value);
    sheetdb[rid][cid].value=value;
    sheetdb[rid][cid].formula=formula;
}
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
function setparentch(formula, chaddress){
    let formulatokens=formula.split(" ");
    for(let i=0; i< formulatokens.length;i++){
        let ascii= formulatokens[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let{rid,cid}=getridcidaddress(formulatokens[i]);
            let parentobj= sheetdb[rid][cid];
            parentobj.children.push(chaddress);
        }
    }
}
function updatechild(cellobj){
    let children=cellobj.children;
    for(let i=0;i<children.length;i++){
        let chaddress=children[i];
        let {rid,cid}=getridcidaddress(chaddress);
        let childobj=sheetdb[rid][cid];
        let chformula = childobj.formula;
        let newval=evaluateformula(chformula);
        setchildcell(newval,chformula,rid,cid);
        updatechild(childobj);
    }
}
function setchildcell(value,formula,rid,cid){
    let uicellelem=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uicellelem.innerText=value;
    sheetdb[rid][cid].value=value;
    sheetdb[rid][cid].formula=formula;

}
function removeformula(cellobj, name){
    let formula= cellobj.formula;
    let formulatokens=formula.split(" ");
    for(let i=0; i< formulatokens.length;i++){
        let ascii= formulatokens[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let{rid,cid}=getridcidaddress(formulatokens[i]);
            let parentobj= sheetdb[rid][cid];
            let idx= parentobj.children.indexOf(name);
            parentobj.children.splice(idx,1);
        }
    }
    cellobj.formula="";
}