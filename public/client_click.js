var xhttp = new XMLHttpRequest();

console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function() {
  modifyText("four");
  console.log('button was clicked');
});

// create a JSON object
const json = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
};



// Function to change the content of t2
function modifyText() {
  const t2 = document.getElementById("t2");
  if (t2.firstChild.nodeValue == "three") {
    t2.firstChild.nodeValue = "two";
  } else {
    t2.firstChild.nodeValue = "three";
  }

  // create a JSON object
  const json = {
      email: 'hi@attacomsian.com',
      password: '123abc'
  };

  // request options
  const options = {
      method: 'POST',
      body: JSON.stringify(json),
      headers: {
          'Content-Type': 'application/json'
      }
  }

  // send post request
  fetch('/josh', options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
}

// Add event listener to table
const el = document.getElementById("outside");
el.addEventListener("click", modifyText, false);



// <button class="btn btn-success">Install</button>
//
// // Client Side Ajax Script
// <script>
//     $('button').click(function () {
//         $.post('/page', {data: 'blah'}, function (data) {
//         console.log(data);
//       });
//     }, 'json');
// </script>
