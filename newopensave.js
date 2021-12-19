let save=document.querySelector(".save");
let open=document.querySelector(".open");


save.addEventListener("click",function(){
    const data= JSON.stringify(sheetdb);
    //data converted to blob
    const blob=new Blob([data],{type:"application/json"});
    //blob converted to url
    const url=window.URL.createObjectURL(blob);
    let a=document.createElement("a");
    //file download
    a.href=url;
    a.download="file.json";
    
    //click option
    a.click();
})

open.addEventListener("change",function(){
    let filesarray=open.files;
    let fileobj = filesarray[0];
    //fileReader -> read file
    let fr=new FileReader(fileobj);
    //as a text;
    fr.readAsText(fileobj);
    fr.onload=function(){
        console.log(fr.result);
    }
    console.log("after");
})