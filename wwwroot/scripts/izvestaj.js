let tbody = document.getElementById("tBody");

let date = new Date();
document.getElementById("from_date").value = date.toLocaleDateString('en-CA');
document.getElementById("to_date").value = date.toLocaleDateString('en-CA');




 function Trazi() {
    tbody.innerHTML = "";
    LoadFiltar ();
let secVal = document.getElementById("sector").value;
     if (secVal != "AllSectors")
         secVal = "";
let empVal = document.getElementById("employe").value;
     if (empVal != "AllEmps")
         empVal = "";
let all = secVal + " " + empVal

console.log(secVal);
console.log(empVal);
    switch (all) {
        case " AllEmps" :
            // sector selected, emp all
            CreateColumnSector();
            break;
        case  "AllSectors ":
            // sector all, emp selected
            CreateColumnName();
            break;
        case  "AllSectors AllEmps" :
            // sector = all , emp = all
            CreateColumnDate();
            break;
        default:
            // sector selected, emp selected
            CreateColumn();
            break;
    }
}


let to_date_forma;
let to_date = document.getElementById("to_date").value;
let from_date = document.getElementById("from_date").value;
let from_date_forma;
let sector = document.getElementById("sector").value;
let employe = document.getElementById("employe").value.split(" ");

function LoadFiltar() {

    from_date = document.getElementById("from_date").value;
    from_date_forma = from_date.slice(0,4) + "." + from_date.slice(5,7) + "." + from_date.slice(8,10);
    
    to_date = document.getElementById("to_date").value;
    to_date_forma = to_date.slice(0,4) + "." + to_date.slice(5,7) + "." + to_date.slice(8,10)
        
    sector = document.getElementById("sector").value
  
    employe = document.getElementById("employe").value.split(" ");

    console.log(from_date_forma);
    console.log(to_date_forma);
    console.log(sector);

    console.log(employe[0]);
    console.log(employe[1]);
}  


function CreateColumn() {

    fetch(`/api/allTimesEmps/${from_date_forma}/${to_date_forma}/${sector}/${employe[0]}/${employe[1]}`)
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {


                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let dOd = document.createElement("td");
                tr.appendChild(dOd);
                let Date_forma = emp.Date.slice(8,10) + "." + emp.Date.slice(5,7) + "." + emp.Date.slice(0,4);
                dOd.innerHTML = Date_forma;
                dOd.className = "thTable";

                let dDo = document.createElement("td");
                tr.appendChild(dDo);
                dDo.innerHTML = emp.Time;
                dDo.className = "thTable";

                let name = document.createElement("td");
                tr.appendChild(name);
                name.innerHTML = emp.Name + " " + emp.Surname;
                name.className = "thTable";

                let sluzba = document.createElement("td");
                tr.appendChild(sluzba);
                sluzba.innerHTML = emp.Sector;
                sluzba.className = "thTable";

                let JBMG = document.createElement("td");
                tr.appendChild(JBMG);
                JBMG.innerHTML = emp.Id;
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



function CreateColumnSector() {

    fetch(`/api/allTimesEmpsSec/${from_date_forma}/${to_date_forma}/${sector}`)
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {


                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let dOd = document.createElement("td");
                tr.appendChild(dOd);
                let Date_forma = emp.Date.slice(8,10) + "." + emp.Date.slice(5,7) + "." + emp.Date.slice(0,4);
                dOd.innerHTML = Date_forma;
                dOd.className = "thTable";

                let dDo = document.createElement("td");
                tr.appendChild(dDo);
                dDo.innerHTML = emp.Time;
                dDo.className = "thTable";

                let name = document.createElement("td");
                tr.appendChild(name);
                name.innerHTML = emp.Name + " " + emp.Surname;
                name.className = "thTable";

                let sluzba = document.createElement("td");
                tr.appendChild(sluzba);
                sluzba.innerHTML = emp.Sector;
                sluzba.className = "thTable";

                let JBMG = document.createElement("td");
                tr.appendChild(JBMG);
                JBMG.innerHTML = emp.Id;
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



function CreateColumnName() {

    fetch(`/api/allTimesEmpsName/${from_date_forma}/${to_date_forma}/${employe[0]}/${employe[1]}`)
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {


                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let dOd = document.createElement("td");
                tr.appendChild(dOd);
                let Date_forma = emp.Date.slice(8,10) + "." + emp.Date.slice(5,7) + "." + emp.Date.slice(0,4);
                dOd.innerHTML = Date_forma;
                dOd.className = "thTable";

                let dDo = document.createElement("td");
                tr.appendChild(dDo);
                dDo.innerHTML = emp.Time;
                dDo.className = "thTable";

                let name = document.createElement("td");
                tr.appendChild(name);
                name.innerHTML = emp.Name + " " + emp.Surname;
                name.className = "thTable";

                let sluzba = document.createElement("td");
                tr.appendChild(sluzba);
                sluzba.innerHTML = emp.Sector;
                sluzba.className = "thTable";

                let JBMG = document.createElement("td");
                tr.appendChild(JBMG);
                JBMG.innerHTML = emp.Id;
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


function CreateColumnDate() {

    fetch(`/api/allTimesEmpsDate/${from_date_forma}/${to_date_forma}`)
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {


                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let dOd = document.createElement("td");
                tr.appendChild(dOd);
                let Date_forma = emp.Date.slice(8,10) + "." + emp.Date.slice(5,7) + "." + emp.Date.slice(0,4);
                dOd.innerHTML = Date_forma;
                dOd.className = "thTable";

                let dDo = document.createElement("td");
                tr.appendChild(dDo);
                dDo.innerHTML = emp.Time;
                dDo.className = "thTable";

                let name = document.createElement("td");
                tr.appendChild(name);
                name.innerHTML = emp.Name + " " + emp.Surname;
                name.className = "thTable";

                let sluzba = document.createElement("td");
                tr.appendChild(sluzba);
                sluzba.innerHTML = emp.Sector;
                sluzba.className = "thTable";

                let JBMG = document.createElement("td");
                tr.appendChild(JBMG);
                JBMG.innerHTML = emp.Id;
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


///Poolinting employee list


let employeArr = document.getElementById("employe");

let worker;
let arrayEmploye = new Array();

worker = document.createElement("option");
worker.value = "AllEmps";
worker.text = "Svi Zaposljeni";
employeArr.appendChild(worker);

// function for pooling employe list

function loadEmp() {
    try {
    fetch("/api/allEmps")
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {

                worker = document.createElement("option");
                worker.value = emp.Name + " " + emp.Surname;
                worker.text = emp.Name + " " + emp.Surname;
                arrayEmploye.shift(emp.Name + " " + emp.Surname);
                employeArr.appendChild(worker);


            });
        })
    } catch (err) {
        console.log(err.message);
    }
}

loadEmp();




///Poolinting  sector list



let sectorArr = document.getElementById("sector");
let optionSector;

optionSector = document.createElement("option");
optionSector.value = "AllSectors";
optionSector.text = "Sve sluzbe";
sectorArr.appendChild(optionSector);


 //function for pooling sectro list
function loadSector() {
    try {

        fetch("/api/allSec")
            .then(resp => resp.json())
            .then(elements => {
                elements.forEach(emp => {
                    optionSector = document.createElement("option");
                    optionSector.value = emp;
                    optionSector.text = emp;
                    sectorArr.appendChild(optionSector);
                });
            })


    } catch (err) {
        console.log(err.message);
    }

}
loadSector();












