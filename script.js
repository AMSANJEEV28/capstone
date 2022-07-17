// validating email

const email = document.getElementById("email");
email.addEventListener("input", function () {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("This is not a valid email address!");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
});

// validating Age
let dob = document.getElementById("dob");
dob.addEventListener("input", function (e) {
  let selectedDate = e.target.value;
  let d = selectedDate.split("-");
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0") - d[2];
  let mm = String(today.getMonth() + 1).padStart(2, "0") - d[1];
  let yyyy = today.getFullYear() - d[0];
  let age = yyyy + mm / 12 + dd / (30 * 12);
  if (age < 18) {
    email.setCustomValidity("You must be atleat 18 Years of age");
    email.reportValidity();
  } else if (age > 54) {
    email.setCustomValidity("You must not be more than 54 Years of age");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
});

// Saving and Displaying the entries
let userEntries = localStorage.getItem("output");
if (userEntries) {
  userEntries = JSON.parse(userEntries);
} else {
  userEntries = [];
}

const displayEntries = () => {
  const savedUserEntries = localStorage.getItem("output");
  let entries = "";
  if (savedUserEntries) {
    const parsedUserEntries = JSON.parse(savedUserEntries);
    entries = parsedUserEntries
      .map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const acceptTerms = `<td>${entry.acceptTermsAndConditions}</td>`;
        const row = `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
        return row;
      })
      .join("\n");
  }
  var table = `<table  border = "1" bgcolor = "white" ;
  ><tr>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>DOB</th>
      <th>Accepted Terms</th>
      </tr>${entries} </table>`;
  let details = document.getElementById("output");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions =
    document.getElementById("acceptTerms").checked;
  const userDetails = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  userEntries.push(userDetails);
  localStorage.setItem("output", JSON.stringify(userEntries));
  displayEntries();
};

let form = document.getElementById("survey-form");
form.addEventListener("submit", saveUserForm, true);
displayEntries();
