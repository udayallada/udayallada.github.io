

$(document).ready(function () {
    $("#login").click(function () {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value
        // Replace these with your actual username and password
        var validUsername = "user";
        var validPassword = "pass";
        if (username == validUsername && password == validPassword) {
            alert("login success.");
            var db1 = firebase.firestore();
            var dataTable = document.getElementById("dataTable");
            db1.collection("messages").get().then((querySnapshot) => {
                dataTable.innerHTML = "<tr><th>Name</th><th>Mobile Number</th><th>Location</th><th>Languages</th><th>Availablity Days</th></tr>"
                querySnapshot.forEach((doc) => {
                    var item = doc.data();
                    var row = "<tr><td>" + item.name + "</td><td>" + item.mobile + "</td><td>" + item.location + "</td><td>" + item.Language + "</td><td>" + item.Days + "</td></tr>";
                    dataTable.innerHTML += row;
                    console.log(item)
                });
            });
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
});

window.onload = function () {
    var form_reg = document.getElementById("volun_reg_form");
    var form_admin = document.getElementById("admin");
    var mainform = document.getElementById("vr_admin");
    mainform.value == "";
    form_reg.style.display = "none";
    form_admin.style.display = "none";
};
function toggleContent() {
    var mainform = document.getElementById("vr_admin");
    var form_reg = document.getElementById("volun_reg_form");
    var form_admin = document.getElementById("admin");    
    if (mainform.value === "select_reg") {
        form_reg.style.display = "block";
        form_admin.style.display = "none";
        
    } else {
        form_reg.style.display = "none";
        form_admin.style.display = "block";
        
    }
}

(function () {
    /*'' here change ur keys*/
    var firebaseConfig = {
        apiKey: "AIzaSyCh-iPnIOKAL7gaFlWhM-QZGxyPZ7wPV1o",
        authDomain: "loginreg-2f495.firebaseapp.com",
        projectId: "loginreg-2f495",
        storageBucket: "loginreg-2f495.appspot.com",
        messagingSenderId: "364827938740",
        appId: "1:364827938740:web:10c868fa19d04fd7f0ece1",
        measurementId: "G-TNV0JXWS05"


        //apiKey: "AIzaSyCriqnlFLoyXbiAHxqC2ZCVD8cxQbSPsfk",
        //authDomain: "volunteer-registration-9f31f.firebaseapp.com",
        //projectId: "volunteer-registration-9f31f",
        //storageBucket: "volunteer-registration-9f31f.appspot.com",
        //messagingSenderId: "121798327522",
        //appId: "1:121798327522:web:577beffb8ff0282a7772bb"
    };

    firebase.initializeApp(firebaseConfig);
    var push_to_firebase = function (data) {
        alert("Thanks for sending a message. I'll try and get back to you as soon as possible.")
        var db = firebase.firestore();
        console.log(data);
        db.collection("messages").add({
            name: data["name"],
            mobile: data["mobile"],
            location: data["location"],
            Language: data["Language"],
            Days: data["Days"]
        });
    }
    var contact_submit = function () {
        var name = document.getElementById("Name");
        var mobile = document.getElementById("Mobile");
        var location = document.getElementById("Location");
        var Language = document.getElementById("Language")
        var Days = document.getElementById("Days")
        var data = {
            "name": name.value,
            "mobile": mobile.value,
            "location": location.value,
            "Language": Language.value,
            "Days": Days.value
        }
        var mobileRegex = /^[6-9][0-9]{9}$/;

        if (!mobileRegex.test(mobile.value)) {
            alert("Please enter a valid 10-digit mobile number.");
            mobile.value = "";
        }
        else {
            push_to_firebase(data);
            window.location.href = "index.html"
        }
    }
    document.getElementById("submit_msg").addEventListener("click", contact_submit);
})();