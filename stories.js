import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- CONFIGURATION ---
// PASTE THE EXACT SAME CONFIG FROM YOUR script.js HERE
const firebaseConfig = {
    apiKey: "AIzaSyBTsQgmJcDmhdNkVbPCPPbyDnGq_R9nblY",
    authDomain: "my-ai-blog-262a8.firebaseapp.com",
    projectId: "my-ai-blog-262a8",
    storageBucket: "my-ai-blog-262a8.firebasestorage.app",
    messagingSenderId: "1041801712158",
    appId: "1:1041801712158:web:21eed08af2f70537b4540f"
};

// --- INIT ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const grid = document.getElementById('storiesGrid');

// --- READ ONLY LISTENER ---
// We removed the "Delete" button logic so visitors can only read.
const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    grid.innerHTML = "";
    
    if (snapshot.empty) {
        grid.innerHTML = "<p style='text-align:center;'>No stories found.</p>";
        return;
    }

    snapshot.forEach((doc) => {
        const post = doc.data();
        
        let dateString = "Just now";
        if(post.timestamp) dateString = post.timestamp.toDate().toLocaleDateString();

        const card = document.createElement('article');
        card.className = 'card';
        
        // Notice: I removed the "Delete" button from the HTML below
        card.innerHTML = `
            <span class="category-tag">${post.category}</span>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="card-footer">
                <span class="card-date">${dateString}</span>
                </div>
        `;
        grid.appendChild(card);
    });
});