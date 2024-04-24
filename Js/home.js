 // Your web app's Firebase configuration (Keep only one instance)
 var firebaseConfig = {
    apiKey: "AIzaSyDmGMXdJ28PBTD987d7j7AttjoHxJ7z-lk",
    authDomain: "lms-gehu.firebaseapp.com",
    databaseURL: "https://lms-gehu-default-rtdb.firebaseio.com",
    projectId: "lms-gehu",
    storageBucket: "lms-gehu.appspot.com",
    messagingSenderId: "979024588330",
    appId: "1:979024588330:web:c03b49f18b9b24c67e1d53"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
  const d = new Date();
    const date_day=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
  // Function to fetch and display user details
  function displayUserInfo(userId) {
    const userDetailsDiv = document.getElementById('userDetails');
    database.ref('users/' + userId).once('value').then(function(snapshot) {
        const userData = snapshot.val();
        if(userData) {
            userDetailsDiv.innerHTML = `
                <div class="user-info">

                    <p>Name: ${userData.full_name}</p>
                    <p>Email: ${userData.email}</p>
                    <p>Phone Number: ${userData.phone_number}</p>
                    <p>Hostel ID: ${userData.hostel_id}</p>
                    <p>Hostel Name: ${userData.hostel_name}</p>
                    <p>Date : ${date_day}</p>
                    </pre>
                    <!-- Add more fields as needed -->
                </div>
            `;
        }
    });
  }

  // Function to add listeners to each card
  function addCardListener(cardId, infoPageId) {
      document.getElementById(cardId).addEventListener('click', function() {
          document.querySelector('.cards-container').style.display = 'none';
          document.getElementById(infoPageId).style.display = 'block';
          if(infoPageId === 'laundry-tips-info') {
              // Display user details when profile section is clicked
              const userId = firebase.auth().currentUser.uid;
              displayUserInfo(userId);
          }
      });
  }
  
  // Function to add listeners to back buttons
  function addBackButtonListener() {
      document.querySelectorAll('.back-button').forEach(button => {
          button.addEventListener('click', function() {
              document.querySelector('.info-page').style.display = 'none'; // Hide any visible info page
              document.querySelector('.cards-container').style.display = 'flex';
              // Ensure all info pages are hidden when going back
              document.querySelectorAll('.info-page').forEach(page => {
                  page.style.display = 'none';
              });
          });
      });
  }
  
  // Initialize card listeners
  addCardListener('laundry-tips-card', 'laundry-tips-info');
  addCardListener('did-you-know-card', 'did-you-know-info');
  addCardListener('stain-removal-card', 'stain-removal-info');
  addCardListener('fabric-care-card', 'fabric-care-info');
  
  // Initialize back button listeners
  addBackButtonListener();
  
  function logoutUser() {
      auth.signOut().then(() => {
          alert("User signed out");
          window.location.replace("index.html")
          updateUserInterface(null);
          
      }).catch((error) => {
          alert("Error signing out: ", error);
      });
  }
  
  function updateUserInterface(user) {
      if (user) {
          document.getElementById('loginContainer').style.display = 'none';
          document.getElementById('registerContainer').style.display = 'none';
          document.getElementById('homeContainer').style.display = 'block';
          // Optionally, update home container content or show a welcome message
      } else {
        window.location.replace("index.html")
      }
  }
  
  auth.onAuthStateChanged(user => {
      console.log("Auth state changed:", user);
      updateUserInterface(user);
  });
  
 