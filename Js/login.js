      // Your web app's Firebase configuration
      const Config = {
        apiKey: "AIzaSyDmGMXdJ28PBTD987d7j7AttjoHxJ7z-lk",
        authDomain: "lms-gehu.firebaseapp.com",
        databaseURL: "https://lms-gehu-default-rtdb.firebaseio.com",
        projectId: "lms-gehu",
        storageBucket: "lms-gehu.appspot.com",
        messagingSenderId: "979024588330",
        appId: "1:979024588330:web:c03b49f18b9b24c67e1d53"
      };
    // Initialize Firebase
    firebase.initializeApp(Config);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()
      
    function register() {
        // Get all our input fields
        email = document.getElementById('registerEmail').value
        password = document.getElementById('registerPassword').value
        full_name = document.getElementById('full_name').value
        hostel_id = document.getElementById('registerHostelid').value
        phone_number = document.getElementById('registerphone').value
        hostel_name = document.getElementById('registerhostelname').value
        const d = new Date();
        const date_day=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
      
        // Validate input fields
        if (validate_email(email) == false || validate_password(password) == false) {
          
          showNotificationModal('Wrong ID or Password Format', false);
          return
          // Don't continue running the code
        }
        if (validate_field(full_name) == false || validate_field(hostel_id) == false || validate_field(phone_number) == false) {
          
          showNotificationModal('One or More Extra Fields is Invalid !!', false);
          return
        }
    
        auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
          // Declare user variable
          var user = auth.currentUser
      
          // Add this user to Firebase Database
          var database_ref = database.ref()
      
          // Create User data
          var user_data = {
            email : email,
            full_name : full_name,
            hostel_id : hostel_id,
            phone_number : phone_number,
            hostel_name: hostel_name,
            last_login :date_day
          }
      
          // Push to Firebase Database
          database_ref.child('users/' + user.uid).set(user_data)
      
          // DOne
          showNotificationModal('User Created ' , true);
        })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
    
      showNotificationModal(error_message , false);
    })
    
    function showNotificationModal(message, isSuccess) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        // Create modal dialog
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Set modal content based on success
        modal.textContent = message;
        modal.style.backgroundColor = isSuccess ? 'lightgreen' : 'lightcoral';
        
        // Append modal to container
        modalContainer.appendChild(modal);
        
        // Append container to body
        document.body.appendChild(modalContainer);
        
        // Remove modal after 10 seconds
        setTimeout(() => {
            document.body.removeChild(modalContainer);
        }, 2000);
    }
    
    
    
    
    
    
    
    
    }
    
    // Set up our login function
    function login () {
        // Get all our input fields
        const d = new Date();
        const date_day=d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
        email = document.getElementById('loginEmail').value
        password = document.getElementById('loginPassword').value
      
        // Validate input fields
        if (validate_email(email) == false || validate_password(password) == false) {
          
          showNotificationModal('Email or Password is Outta Line!!' , false);
          return
          // Don't continue running the code
        }
        auth.signInWithEmailAndPassword(email, password)
        .then(function() {
          // Declare user variable
          var user = auth.currentUser
      
          // Add this user to Firebase Database
          var database_ref = database.ref()
      
          // Create User data
          var user_data = {
            last_login : date_day
          }
      
          // Push to Firebase Database
          database_ref.child('users/' + user.uid).update(user_data)
      
          // DOne
          showNotificationModal('Logged in Successfully', true);
                        
          window.location.replace("home.html")
      
        })
        .catch(function(error) {
          // Firebase will use this to alert of its errors
          var error_code = error.code
          var error_message = error.message
      
          showNotificationModal('Error logging in: ' , false);
        })
      }
      function showNotificationModal(message, isSuccess) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        // Create modal dialog
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Set modal content based on success
        modal.textContent = message;
        modal.style.backgroundColor = isSuccess ? 'lightgreen' : 'lightcoral';
        
        // Append modal to container
        modalContainer.appendChild(modal);
        
        // Append container to body
        document.body.appendChild(modalContainer);
        
        // Remove modal after 10 seconds
        setTimeout(() => {
            document.body.removeChild(modalContainer);
        }, 2000);
    }
    
    
    // Validate Functions
    function validate_email(email) {
        expression = /^[^@]+@\w+(\.\w+)+\w$/
        if (expression.test(email) == true) {
          // Email is good
          return true
        } else {
          // Email is not good
          return false
        }
      }
      
      function validate_password(password) {
        // Firebase only accepts lengths greater than 6
        if (password < 6) {
          return false
        } else {
          return true
        }
      }
      
      function validate_field(field) {
        if (field == null) {
          return false
        }
      
        if (field.length <= 0) {
          return false
        } else {
          return true
        }
      }
    
        // Function to add listeners to each card
        function addCardListener(cardId, infoPageId) {
            document.getElementById(cardId).addEventListener('click', function() {
                document.querySelector('.cards-container').style.display = 'none';
                document.getElementById(infoPageId).style.display = 'block';
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
        
        function showAddLaundryForm() {
            const formContainer = document.getElementById('addLaundryForm');
            const dashboardContainer = document.getElementById('dashboardContainer');
            if (formContainer.classList.contains('hidden')) {
                formContainer.classList.remove('hidden');
                dashboardContainer.classList.add('hidden'); // Optionally hide the dashboard
            } else {
                formContainer.classList.add('hidden');
                dashboardContainer.classList.remove('hidden'); // Optionally show the dashboard again
            }
        }
        
            
    
      
        
        function showLogin() {
            document.getElementById('loginContainer').style.display = 'block';
            document.getElementById('registerContainer').style.display = 'none';
            document.getElementById('homeContainer').style.display = 'none';
        }
        
        function showRegister() {
            document.getElementById('registerContainer').style.display = 'block';
            document.getElementById('loginContainer').style.display = 'none';
            document.getElementById('homeContainer').style.display = 'none';
        }
        
        function registerUser() {
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
        
            if (!email || !password) {
                
                showNotificationModal('Email and password must be provided', false);
                return;
            }
        
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    showNotificationModal('Registration successful', true);
                    
                    updateUserInterface(userCredential.user); // Update UI or navigate to another page
                })
                .catch((error) => {
                    showNotificationModal('Error registering user', false);
                });
        }
        
        
        function loginUser() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
        
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("User logged in successfully");
                    updateUserInterface(userCredential.user);
                })
                .catch((error) => {
                    console.error("Error logging in: ", error.message);
                    showNotificationModal('Error Login user', false);
                });
        }
        
        function showNotificationModal(message, isSuccess) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        
        // Create modal dialog
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        // Set modal content based on success
        modal.textContent = message;
        modal.style.backgroundColor = isSuccess ? 'lightgreen' : 'lightcoral';
        
        // Append modal to container
        modalContainer.appendChild(modal);
        
        // Append container to body
        document.body.appendChild(modalContainer);
        
        // Remove modal after 10 seconds
        setTimeout(() => {
            document.body.removeChild(modalContainer);
        }, 2000);
    }