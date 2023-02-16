import React, { useEffect, useState } from "react"
//import * as XLSX from "xlsx";
import Proptypes from 'prop-types';
import { CSVLink } from 'react-csv';
import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { DownloadTableExcel, downloadExcel } from 'react-export-table-to-excel';


export default function App() {

  const [ data, setData ] = useState([]);
  const [ final, setFinal ] = useState({});
  const [ prize, setPrize ] = useState([]);
  const [ arr, setArr ] = useState([]);

  //var arr = [];

  const duplicates = arr.filter((item, index) => index !== arr.indexOf(item));
  
  const ExportExcel=({excelData,filename})=>{
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension='.xlsx'

    const exportToExcel = async ()=>{
      const ws=XLSX.utils.json_to_sheet(excelData);
      const wb = {Sheets : {'data': ws},SheetNames:['data']}
      const excelBuffer = XLSX.write(wb,{bookType:'xlss',type:'array'})
      const data=new Blob([excelBuffer],{type:fileType})
      FileSaver.saveAs(data,filename+fileExtension)
    }
  }


  function addfile(event) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      let arrayBuffer = fileReader.result;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      const dat=XLSX.utils.sheet_to_json(worksheet, { raw: true })
      setData(dat);
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });


    };
  };

  function handle(){
    console.log("K")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    //arr.push(prize)
    setArr (prize.split(","))
    console.log(arr)
    //alert(`The name you entered was: `)
  }
arr.push(" ")
  var dup=[]
  let totalhadiah =0
  for(i =0;i<arr.length;i++){
    totalhadiah=0
    
    for(y=0;y<arr.length;y++){
      if(arr[i]==arr[y]){
        totalhadiah = totalhadiah +1
        var hasil={
          hadiah:arr[i],
          total:totalhadiah
        }
        dup.push(hasil)
        console.log(totalhadiah+"arrni")
      }
    }
  }
  console.log(dup)
  //var res = arr[Math.floor(Math.random() * arr.length)]
  var ars=[]
  var y=0

data.map((data,index) =>{

  const res = arr[Math.floor(Math.random() * arr.length)]
  var tot = {
    nama : data.Nama,
    hadiah : res
  }
  var ex=data.length
  
  //if("asd"==null)
  //console.log("tottt"+tot.hadiah)
  ars.push(tot)
  //setFinal(ars)
ars.map((ars,index)=>{
    //console.log(index+1)
    //console.log(ars.nama)
  })

  
  //console.log(res, ars[res])
})
console.log(ars)

for(var i=0;i<=ars.length-1;i++){

  for(var y=i+1;y<=ars.length-1;y++){

    if(ars[y].hadiah==ars[i].hadiah){
      ars[y].hadiah = null
    }

  }
  
  console.log(ars[i].hadiah)

}

function handleExport() {
       // const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
        let exportData = [];
        for(let i = 0; i< ars.length; ++i) {
            exportData.push({
                nama: ars[i].nama,
                hadiah: ars[i].hadiah,
                
            })
        }
        downloadExcel({
            fileName: `pengajuan_${new Date().getTime()}`,
            sheet: "Pengajuan",
            tablePayload: {
                header: ["Nama","Hadiah"],
                body: exportData
            }
        })
    }
//console.log(data.length)

  return (

<div class="block p-6 rounded-lg shadow-lg bg-white max-w-md ml-auto mr-auto pt-20">
    <div className="">
      <input
        type="file"
        placeholder="Upload file"
        accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={(event) => {
          addfile(event)
        }}
        
/>
    
  <form onSubmit={handleSubmit}>
    <div class="form-group mb-6">
      
    </div>
    <div class="form-group mb-6">
      
    </div>
    <div class="form-group mb-6">
      <textarea
      class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlTextarea13"
      rows="3"
      placeholder="Message"
      value={prize}
          onChange={(e) => setPrize(e.target.value)}
    ></textarea>
    </div>
    <div class="form-group form-check text-center mb-6">
      
    </div>
    <button type="submit" class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Spin</button>
  </form>
</div>
{
  ars.map(ars =>{
     
    return (
      <div class="container">
        <div class ="card">
      <h1 class="">{ars.nama } hadiah = {ars.hadiah}</h1>
      </div>
      </div>
      )
  })
}


{

//console.log(ars)
console.log(duplicates)
}
<button onClick={handleExport} className="bg-blue-600 rounded-lg text-white px-3 py-1 h-fit">Export</button>

    </div>
  );
  
}


//if kocokan sudah dapat indexx array sekian maka drop dari array index tsb