// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdWs2fUGScVKtdftvhCl47CevblFeRLV0",
  authDomain: "assignment-18c1d.firebaseapp.com",
  projectId: "assignment-18c1d",
  storageBucket: "assignment-18c1d.firebasestorage.app",
  messagingSenderId: "331783396229",
  appId: "1:331783396229:web:78d3ffbc95643d129642ec",
  measurementId: "G-3H32HZ3EJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Event listener for the signup and signin buttons
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signupButton')?.addEventListener('click', (e) => {
    e.preventDefault();  
    signup();
  });

  document.getElementById('loginButton')?.addEventListener('click', (e) => {
    e.preventDefault();  
    signin();
  });
});

// Signup Function
function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === '' || password === '') {
    alert('Please fill out both email and password fields.');
    return;
  }

  if (password.length < 6) {
    alert('Password should be at least 6 characters long.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed up:', user);
      alert('Sign up successful! Welcome, ' + user.email);
      window.location.href = "./signin.html";
    })
    .catch((error) => {
      console.error('Error signing up:', error.code, error.message);
      alert('Error: ' + error.message);
    });
}

// Signin Function
function signin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === '' || password === '') {
    alert('Please fill out both email and password fields.');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.pathname = "../index.html";
      console.log('Signed in successfully: ', user);
      alert('Logged in...');
      sessionStorage.setItem("user", user.email);
      // console.log(window.location.href = "../Lipstick-Website/index.html"); 
      

    })
    .catch((error) => {
      console.error('Error during login:', error.code, error.message);
      alert('Error: ' + error.message);
    });
}

// // Firestore Example Function to Add a Product
// async function addProduct() {
//   try {
//     const docRef = await addDoc(collection(db, "products"), {
//       name: "Red Velvet Lipstick",
//       price: "$10",
//       description: "A beautiful red velvet lipstick.",
//       imgLink: "https://example.com/img/product1.png",
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
