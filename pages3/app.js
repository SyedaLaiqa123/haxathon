import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp, getDocs, query } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Save a new post to Firestore
window.savePost = async function() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title && content) {
        try {
            const newPost = {
                title: title,
                content: content,
                created_at: Timestamp.fromDate(new Date())
            };

            await addDoc(collection(db, 'posts'), newPost);
            alert('Post saved successfully');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error adding post:', error);
            alert('Failed to save the post');
        }
    } else {
        alert('Please fill out all fields.');
    }
};

// Fetch posts from Firestore and display on the homepage
document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('posts');

    try {
        const postsQuery = query(collection(db, 'posts'));
        const snapshot = await getDocs(postsQuery);

        snapshot.forEach(doc => {
            const postData = doc.data();
            const postDiv = document.createElement('div');

            postDiv.innerHTML = `
                <h2>${postData.title}</h2>
                <p>${postData.content}</p>
                <hr />
            `;

            postsContainer.appendChild(postDiv);
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
        alert('Failed to load posts');
    }
});