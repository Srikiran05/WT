document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
    setupDarkMode();
});

function addPost() {
    let postInput = document.getElementById("postInput");
    let postText = postInput.value.trim();

    if (postText === "") {
        alert("Post cannot be empty!");
        return;
    }

    // AI Content Moderation (Simple)
    let bannedWords = ["badword1", "badword2", "badword3"];
    for (let word of bannedWords) {
        if (postText.toLowerCase().includes(word)) {
            alert("⚠️ Inappropriate content detected!");
            return;
        }
    }

    let postsContainer = document.getElementById("postsContainer");

    // Create post element
    let postElement = document.createElement("div");
    postElement.classList.add("post");

    // Add content with Like, Comment, and Delete buttons
    postElement.innerHTML = `
        <p>${postText}</p>
        <button class="like-btn" onclick="likePost(this)">🔥 Like <span class="like-count">0</span></button>
        <button class="comment-btn" onclick="toggleComments(this)">💬 Comment</button>
        <button class="delete-btn" onclick="deletePost(this)">💀 Delete</button>
        <div class="comment-box">
            <input type="text" class="form-control comment-input" placeholder="Write a comment...">
            <button class="btn btn-success comment-post-btn" onclick="addComment(this)">Post</button>
            <div class="comment-list"></div>
        </div>
    `;

    // Append to container
    postsContainer.prepend(postElement);

    // Clear input
    postInput.value = "";
}

function likePost(button) {
    let likeCount = button.querySelector(".like-count");
    let currentLikes = parseInt(likeCount.textContent);

    // Increase like count
    likeCount.textContent = currentLikes + 1;

    // Apply Boom Effect
    likeCount.classList.add("like-boom");
    setTimeout(() => {
        likeCount.classList.remove("like-boom");
    }, 400);
}

function deletePost(btn) {
    let postElement = btn.parentElement;
    postElement.remove();
}

function toggleComments(button) {
    let commentBox = button.nextElementSibling;
    commentBox.style.display = (commentBox.style.display === "block") ? "none" : "block";
}

function addComment(button) {
    let commentInput = button.previousElementSibling;
    let commentText = commentInput.value.trim();

    if (commentText === "") {
        alert("Comment cannot be empty!");
        return;
    }

    let commentList = button.nextElementSibling;

    // Create comment element
    let commentElement = document.createElement("p");
    commentElement.innerHTML = `💬 <strong>User:</strong> ${commentText}`;
    commentElement.classList.add("comment-text");

    // Append to comment list
    commentList.appendChild(commentElement);

    // Clear input field
    commentInput.value = "";
}

function setupDarkMode() {
    let darkModeToggle = document.createElement("button");
    darkModeToggle.id = "darkModeToggle";
    darkModeToggle.textContent = "🌙 Dark Mode";
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
}

function loadPosts() {
    let postsContainer = document.getElementById("postsContainer");

    if (postsContainer.children.length === 0) {
        postsContainer.innerHTML = `<p class="text-center text-muted">No posts yet. Start by adding one!</p>`;
    }
}
