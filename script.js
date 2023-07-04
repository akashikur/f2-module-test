const students = [];
let nextId = students.length + 1;
function renderStudents() {
  const table = document.getElementById("studentTable");
  table.innerHTML = `
  <tr>
    <th>ID</th>
    <th>Student Name</th>
    <th>Email</th>
    <th>Age</th>
    <th>GPA</th>
    <th>Degree</th>
  </tr>
`;

  for (const student of students) {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${student.ID}</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.gpa}</td>
    <td>${student.degree}
    <span class="material-symbols-sharp" onclick="deleteStudent(${student.ID})">
delete
</span>
    <span class="material-symbols-sharp" onclick=" editStudent(${student.ID})">
    edit_square
    </span>
    </td>
    
    
  `;

    table.appendChild(row);
  }
}
function addStudents() {
  const form = document.getElementById("studentForm");
  const studentId = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const gpa = document.getElementById("gpa").value;
  const degree = document.getElementById("degree").value;

  if (studentId) {
    const student = students.find((s) => s.ID === parseInt(studentId));
    student.name = name;
    student.email = email;
    student.age = parseInt(age);
    student.gpa = gpa;
    student.degree = degree;
  } else {
    const newStudent = {
      ID: nextId++,
      name,
      email,
      age: parseInt(age),
      gpa,
      degree,
    };

    students.push(newStudent);
  }

  form.reset();
  renderStudents();
  document.getElementById("studentId").value = "";
  document.getElementById("studentForm").querySelector("button").innerHTML =
    "Add Student";
}
function editStudent(studentId) {
  const form = document.getElementById("studentForm");
  const student = students.find((s) => s.ID === studentId);

  document.getElementById("studentId").value = student.ID;
  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;
  document.getElementById("age").value = student.age;
  document.getElementById("gpa").value = student.gpa;
  document.getElementById("degree").value = student.degree;

  const addButton = form.querySelector("button");
  addButton.innerHTML = "Edit Student";
  addButton.style.backgroundColor = "black";
  addButton.style.border = "1px solid #ffffff";
  addButton.style.color = "#ffffff";
  addButton.onclick = saveStudent;
}

function deleteStudent(studentId) {
  const index = students.findIndex((s) => s.ID === studentId);

  if (index !== -1) {
    students.splice(index, 1);
    renderStudents();
  }
}

function searchStudents() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.toLowerCase();

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.gpa.toLowerCase().includes(searchText)
    );
  });

  renderFilteredStudents(filteredStudents);
}

function renderFilteredStudents(filteredStudents) {
  const table = document.getElementById("studentTable");
  table.innerHTML = `
  <tr>
  <th>ID</th>
  <th>Student Name</th>
  <th>Email</th>
  <th>Age</th>
  <th>GPA</th>
  <th>Degree</th>
  
</tr>
`;

  for (const student of filteredStudents) {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${student.ID}</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.age}</td>
    <td>${student.gpa}</td>
    <td>${student.degree}
    <span class="material-symbols-sharp" onclick="deleteStudent(${student.ID})">
delete
</span>
    <span class="material-symbols-sharp" onclick="editStudent(${student.ID})">
    edit_square
    </span>
    </td>
  `;

    table.appendChild(row);
  }
}

renderStudents();
