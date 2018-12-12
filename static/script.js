function validation() {
    var fName = document.getElementById("first-name").value;
    var lName = document.getElementById("last-name").value; 
    var uName = document.getElementById("username").value; 
    var message = ""; 
    if (fName == "") {
        message = "Please enter your first name";
    }
    else if (lName == "") {
        message = "Please enter your last name";
    }
    else if (uName == "") {
        message = "Please enter your username";
    }

    if (message != "") {
        alert(message);
        return false;
    }
    else {
        return true;
    }
}