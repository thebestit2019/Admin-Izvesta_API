
//Adding values to list of employees
let LiItem;
let InItem;
(function loadList() {
    fetch("/api/allEmps")
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {
                LiItem = document.createElement("li");
                LiItem.className = 'newEmp'
                InItem = document.createElement("input");

                InItem.type = 'submit';
                InItem.value = emp.Name + " " + emp.Surname + " " + emp.Id + " " + emp.Sector;
                InItem.addEventListener('click', function () {
                    document.getElementById('InId').value = emp.Id;
                    document.getElementById('InCode').value = emp.Code;
                    document.getElementById('InName').value = emp.Name;
                    document.getElementById('InSurname').value = emp.Surname;
                    document.getElementById('InTitle').value = emp.Title;
                    document.getElementById('InSector').value = emp.Sector;
                    document.getElementById('InKey').value = emp.Key;

                });
                LiItem.appendChild(InItem);
                document.getElementById('empList').appendChild(LiItem)
            });
        })
})()

//Reset page on 'Odustani' button
document.getElementById("Cancel").addEventListener("click", function () {
    window.location.reload();
});

//Check if id is in database
async function CheckKey() {
    let allKeys = new Array();
    let inKey = document.getElementById('InKey').value;
    let exists = false;

    await fetch("/api/allEmps")
        .then(resp => resp.json())
        .then(elements => {
            elements.forEach(emp => {
                allKeys.push(emp.Key);
            })
        })
        .then(() => {

            allKeys.forEach(el => {
                if (el == inKey) {
                    exists = true;
                    console.log("There is a same id in database and it is " + el + ' ' + exists);
                    return exists;
                }
            });
        });
    return exists;
}

//Check if all inputs are inserted
function CheckInputs() {
    let idField = document.getElementById('InId');
    let codeField = document.getElementById('InCode');
    let nameField = document.getElementById('InName')
    let surnameField = document.getElementById('InSurname')
    let titleField = document.getElementById('InTitle')
    let sectorField = document.getElementById('InSector')
    if (idField.value != '' &&
        codeField.value != '' &&
        nameField.value != '' &&
        surnameField.value != '' &&
        titleField.value != '' &&
        sectorField.value != '') {
        return true;
    } else {
        return false;
    }
}

//Change button function - take all inputs from form and send it to controller using AJAX
function ChangeBtn() {

    if (CheckInputs()) {

        CheckKey().then(resp => {
            if (resp) {
                //Calling PUT function
                PutFunction();
            } else {
                alert("Nepostojeci radnik. Probajte da unesete novog radnika klikom na dugme POTVRDI")
            }
        });

    } else {
        alert("Morate popuniti sva polja")
    }

}

function AcceptBtn() {
    if (CheckInputs()) {

        CheckKey().then(resp => {
            if (resp) {
                alert("Takav radnik vec postoji. Ako zelite da izmenite postojeceg radnika kliknite na dugme IZMENI")
            } else {
                //Calling POST Function
                PostFunction();
            }
        });

    } else {
        alert("Morate popuniti sva polja")
    }
}

//Add listener to btn Change
document.getElementById("Change").addEventListener("click", function () {
    ChangeBtn();
});

//Add listener to btn Accept
document.getElementById("Accept").addEventListener("click", function () {
    AcceptBtn();
})



//Creates function that will send data to controller that adds new employee in db.
function PostFunction() {
    let xhr = new XMLHttpRequest();
    
    let postData = {};
    postData.Id = document.getElementById('InId').value;
    postData.Code = document.getElementById('InCode').value;
    postData.Name = document.getElementById('InName').value;
    postData.Surname = document.getElementById('InSurname').value;
    postData.Title = document.getElementById('InTitle').value;
    postData.Sector = document.getElementById('InSector').value;
    // postData.Key = document.getElementById("InKey").value;

    xhr.open('POST', '/api/newEmp', true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    var dataJson = JSON.stringify(postData);
    xhr.send(dataJson);
    
    alert("Uspesan unos")
    window.location.reload();
   
}

//Creates function that will send data to controller that updates existing employee in db.
function PutFunction() {
    let xhr = new XMLHttpRequest();

    let putData = {};
    putData.Id = document.getElementById('InId').value;
    putData.Code = document.getElementById('InCode').value;
    putData.Name = document.getElementById('InName').value;
    putData.Surname = document.getElementById('InSurname').value;
    putData.Title = document.getElementById('InTitle').value;
    putData.Sector = document.getElementById('InSector').value;
    putData.Key = document.getElementById("InKey").value;

    xhr.open('PUT', '/api/updateEmp', true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.upload.onload = function () {
       
    // }
    var dataJson = JSON.stringify(putData);
    xhr.send(dataJson);
    alert("Uspesna izmena podataka o radniku");
    window.location.reload();
}

