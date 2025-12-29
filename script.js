import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- CONFIGURATION ---

// 1. PASTE YOUR FIREBASE KEYS HERE
const firebaseConfig = {
    apiKey: "AIzaSyBTsQgmJcDmhdNkVbPCPPbyDnGq_R9nblY",
    authDomain: "my-ai-blog-262a8.firebaseapp.com",
    projectId: "my-ai-blog-262a8",
    storageBucket: "my-ai-blog-262a8.firebasestorage.app",
    messagingSenderId: "1041801712158",
    appId: "1:1041801712158:web:21eed08af2f70537b4540f"
};

// 2. PASTE OPENAI KEY HERE (Or leave blank if using Fake AI below)
const OPENAI_API_KEY = "PASTE_SK_KEY_HERE";

// --- INIT ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const modal = document.getElementById('postModal');
const grid = document.getElementById('blogGrid');

// --- AI LOGIC ---
document.getElementById('aiBtn').addEventListener('click', generateTitle);

async function generateTitle() {
    const content = document.getElementById('content').value;
    const aiBtn = document.getElementById('aiBtn');
    const titleInput = document.getElementById('title');

    // Validation
    if (!content) {
        alert("Please write some content first!");
        return;
    }

    // Set Loading State
    const originalText = aiBtn.innerText;
    aiBtn.innerText = "Thinking...";
    aiBtn.disabled = true;

    try {
  // for fake ai suggestion
        await new Promise(r => setTimeout(r, 1500));
        const fakeTitles = [
            "daily life routine",
            "Why You Should Care About This",
            "10 Secrets Nobody Told You",
            "A Deep Dive into Modern Trends"
        ];
        titleInput.value = fakeTitles[Math.floor(Math.random() * fakeTitles.length)];

    } catch (error) {
        console.error("AI Error:", error);
        alert("Something went wrong with the AI.");
    } finally {
        aiBtn.innerText = originalText;
        aiBtn.disabled = false;
    }
}

// --- DATABASE LISTENER ---
const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    grid.innerHTML = "";
    snapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;
        let dateString = "Just now";
        if(post.timestamp) dateString = post.timestamp.toDate().toLocaleDateString();

        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <span class="category-tag">${post.category}</span>
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="card-footer">
                <span class="card-date">${dateString}</span>
                <button class="btn-delete" data-id="${postId}">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Attach delete listeners
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
});

// --- ADD POST ---
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    try {
        await addDoc(collection(db, "posts"), {
            title: title, category: category, content: content, timestamp: serverTimestamp()
        });
        document.getElementById('postForm').reset();
        modal.classList.remove('active');
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Firebase Error. Check Console.");
    }
});

// --- DELETE POST ---
async function handleDelete(e) {
    if(confirm("Delete this from the cloud database?")) {
        const id = e.target.getAttribute('data-id');
        await deleteDoc(doc(db, "posts", id));
    }
}

// --- MODAL CONTROLS ---
document.getElementById('openModalBtn').addEventListener('click', () => modal.classList.add('active'));
document.getElementById('closeModalBtn').addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });