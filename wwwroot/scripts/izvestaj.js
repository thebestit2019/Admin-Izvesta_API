let tbody = document.getElementById("tBody");

let date = new Date();
document.getElementById("from_date").value = date.toLocaleDateString('en-CA');
document.getElementById("to_date").value = date.toLocaleDateString('en-CA');

loadEmp();

loadSector();

LoadFiltar ();

CreateColumn();




function Trazi() {
    document.getElementById("from_date").value = date.toLocaleDateString('en-CA');
    document.getElementById("to_date").value = date.toLocaleDateString('en-CA');

    tbody.innerHTML = "";
 
    LoadFiltar ();
      
    CreateColumn();
}




function LoadFiltar() {

    let from_date = document.getElementById("from_date").value
    let from_date_forma = from_date.slice(8,10) + "." + from_date.slice(5,7) + "." + from_date.slice(0,4);

    let to_date = document.getElementById("to_date").value
    let to_date_forma = to_date.slice(8,10) + "." + to_date.slice(5,7) + "." + to_date.slice(0,4)
    
    let sector = document.getElementById("sector").value
  
    let employe = document.getElementById("employe").value.split(" ");

    console.log(from_date_forma);
    console.log(to_date_forma);
    console.log(sector);

    console.log(employe[0]);
    console.log(employe[1]);


    let filtar = new XMLHttpRequest();
    let postFilter = {};
    postFilter.from_date_forma = from_date_forma;
    postFilter.to_date_forma = to_date_forma;
    postFilter.sector = sector;
    postFilter.name = employe[0];
    postFilter.surname = employe[1];

    filtar.open('GET', '/api/allTimesEmps', true);
    filtar.setRequestHeader('Content-Type', 'application/json');

    var filterJson = JSON.stringify(postFilter);
    filtar.send(filterJson);
    console.log(filterJson);
    alert("Uspesna unet filtar u bazu");
}  


function CreateColumn() {

    fetch("/api/allTimesEmps")
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {


                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let dOd = document.createElement("td");
                tr.appendChild(dOd);
                let Date_forma = emp.Date.slice(8,10) + "." + emp.Date.slice(5,7) + "." + emp.Date.slice(0,4);
                dOd.textContent = Date_forma;
                dOd.className = "thTable";

                let dDo = document.createElement("td");
                tr.appendChild(dDo);
                dDo.textContent = emp.Time;
                dDo.className = "thTable";

                let name = document.createElement("td");
                tr.appendChild(name);
                name.textContent = emp.Name + " " + emp.Surname;
                name.className = "thTable";

                let sluzba = document.createElement("td");
                tr.appendChild(sluzba);
                sluzba.textContent = emp.Sector;
                sluzba.className = "thTable";

                let JBMG = document.createElement("td");
                tr.appendChild(JBMG);
                JBMG.textContent = emp.Id;
                JBMG.className = "thTable";

                let PIC = document.createElement("td");
                tr.appendChild(PIC);
                var image = new Image();
                image.src = emp.Pic
                // PIC.textContent = emp.Pic;
                PIC.className = "thTable";
                PIC.appendChild(image);

            });
        })
}


function Delete() {
    tbody.innerHTML = "";
}




function Print() {
    var divToPrint = document.getElementById("divTable").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = divToPrint;
    window.print();
    document.body.innerHTML = originalContents;
    
}




///Pouleinting employee list


let employe = document.getElementById("employe");

let worker;
let arrayEmploye = new Array();

worker = document.createElement("option");
worker.value = "AllEmps";
worker.text = "Svi Zaposljeni";
employe.appendChild(worker);

function loadEmp() {
    fetch("/api/allEmps")
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {

                worker = document.createElement("option");
                worker.value = emp.Name + " " + emp.Surname;
                worker.text = emp.Name + " " + emp.Surname;
                arrayEmploye.shift(emp.Name + " " + emp.Surname);
                employe.appendChild(worker);


            });
        })
}




///Pouleinting employee sector list



let sector = document.getElementById("sector");

let optionSector;
let sectorArray = new Array();

optionSector = document.createElement("option");
optionSector.value = "AllSectors";
optionSector.text = "Sve sluzbe";
sector.appendChild(optionSector);



function loadSector() {
    try {

        fetch("/api/allSec")
            .then(resp => resp.json())
            .then(elements => {
                elements.forEach(emp => {
                    optionSector = document.createElement("option");
                    optionSector.value = emp;
                    optionSector.text = emp;
                    sector.appendChild(optionSector);
                });
            })


    } catch (err) {
        console.log(err.message);
    }

}












