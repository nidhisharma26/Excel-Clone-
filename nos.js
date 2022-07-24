let n = document.querySelector(".new");
let o = document.querySelector(".open");
let s = document.querySelector(".save");
let fname = document.querySelector(".file-name");
let onpc = document.querySelector(".on-pc");

fname.defaultValue = "Untitled spreadsheet ";
onpc.defaultValue = "on Pc";
fname.addEventListener("focus", function() {

    fname.style.border = "1px solid blue";

})
fname.addEventListener("blur", function() {

    fname.style.border = "1px solid transparent";

})

s.addEventListener("click", function() {

    const data = JSON.stringify(sheetDB);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    let filename = fname.value
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
})
o.addEventListener("click", function() {
    let choose = document.createElement("input");
    choose.setAttribute("type", "file");
    choose.click();
    choose.addEventListener("change", function() {
        let filesarray = choose.files;
        let filesarrayobj = filesarray[0];
        let fr = new FileReader(filesarrayobj);
        fr.readAsText(filesarrayobj);
        fr.onload = function() {
            let result = JSON.parse(fr.result);
            let dbidx = sheetarray.indexOf(sheetDB);
            for (let i = 0; i < result.length; i++) {
                sheetDB[i] = result[i];
            }
            setUi();
        }
    })
})
n.addEventListener("click", function() {
    clearUi();
})