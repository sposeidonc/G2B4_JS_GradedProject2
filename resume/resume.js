console.log(this);
console.log(data);
let currentIndex = 0;
let filteredResume = [];
let allResumes = data.resume;


window.onload = function () {
  console.log("Page and all resources loaded!");
  loadResume(currentIndex);
}
function loadResume(currentIndex) {
  isButtonVisible(allResumes);
  resumeData = allResumes[currentIndex];
  loadData(resumeData);

}
function isButtonVisible(allResumes) {
  const nextButton = document.getElementById('nextButton');
  const prevButton = document.getElementById('prevButton');
  if ((currentIndex === allResumes.length - 1 && currentIndex === 0) || allResumes.length === 0) {
    nextButton.style.visibility = "hidden";
    prevButton.style.visibility = "hidden";
  }
  else if (currentIndex === allResumes.length - 1) {
    nextButton.style.visibility = "hidden";
    prevButton.style.visibility = "visible";
  }
  else if (currentIndex === 0) {
    nextButton.style.visibility = "visible";
    prevButton.style.visibility = "hidden";
  }
  else {
    nextButton.style.visibility = "visible";
    prevButton.style.visibility = "visible";
  }
}
function loadData(data) {
  console.log("Loading for resume " + data);
  document.getElementById("name").innerText = data['basics']['name'];
  document.getElementById("job").innerText = 'Applied For : '+data['basics']['AppliedFor'];

  document.getElementById("phone").innerText = data['basics']['phone'];
  document.getElementById("email").innerText = data['basics']['email'];
  document.getElementById("linkedln").innerHTML = '<a href=' + data['basics']['profiles']['url'] + '>' + data['basics']['profiles']['network'] + '</a>';

  for (i = 0; i < 3; i++) {
    document.querySelectorAll(".skill")[i].innerHTML = data.skills.keywords[i];
    document.querySelectorAll(".hobbie")[i].innerHTML = data.interests.hobbies[i];
  }

  document.querySelector('#company').innerHTML = '<b>Company Name : </b>' + data.work['Company Name'];
  document.querySelector('#position').innerHTML = '<b>Position : </b>' + data.work['Position'];
  document.querySelector('#sdate').innerHTML = '<b>Start date : </b>' + data.work['Start Date'];
  document.querySelector('#edate').innerHTML = '<b>End date : </b>' + data.work['End Date'];
  document.querySelector('#summary').innerHTML = '<b>Summary : </b>' + data.work['Summary'];

  document.getElementById("project").innerHTML = '<b>' + data.projects['name'] + ' : </b>' + data.projects['description'];

  document.getElementById("ug").innerHTML = '<b>UG : </b>' + data.education.UG.institute + ', ' + data.education.UG.course + ', ' + data.education.UG["Start Date"] +
    ', ' + data.education.UG["End Date"] + ', ' + data.education.UG.cgpa;
  document.getElementById("pu").innerHTML = '<b>PU : </b>' + data.education["Senior Secondary"].institute + ', ' + data.education["Senior Secondary"].cgpa;
  document.getElementById("highSchool").innerHTML = '<b>High School : </b>' + data.education["High School"].institute + ', ' + data.education["High School"].cgpa;


  document.getElementById("achievement").innerHTML = '';
  for (i = 0; i < data.achievements.Summary.length; i++) {
    document.getElementById("achievement").innerHTML = document.getElementById("achievement").innerHTML +
      '<li>' + data.achievements.Summary[i] + '</li>';
  }

}
nextButton.addEventListener('click', function () {
  console.log('Next Button Clicked');
  currentIndex++;
  loadResume(currentIndex);
});
prevButton.addEventListener('click', function () {
  console.log('Pevious Button Clicked');
  currentIndex--;
  loadResume(currentIndex);
});

const searchInput = document.querySelector('#searchBox');
searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    let value = searchInput.value;
    allResumes = data.resume.filter(word => {
      return word.basics.AppliedFor.toLowerCase().includes(value.toLowerCase());
    });
    console.log(allResumes);
    if (allResumes.length === 0) {
      document.getElementsByClassName('resume')[0].style.display = 'none';
      document.getElementsByClassName('errorDialog')[0].style.display = 'block';
    }
    else {
      document.getElementsByClassName('resume')[0].style.display = 'block';
      document.getElementsByClassName('errorDialog')[0].style.display = 'none';
    }
    currentIndex = 0;
    loadResume(currentIndex);
    isButtonVisible(allResumes);
  }
  else {
    allResumes = data.resume;
  }
});

