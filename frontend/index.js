const postsContainer = document.querySelector('.posts-container');
const createPostContainer = document.querySelector(".create-post-container");
const postContainer = document.querySelector(".post-container");
const contentWrapper = document.querySelector('.content-wrapper');
const registerContainer = document.querySelector('.register-container');
const signinContainer = document.querySelector('.signin-container');
const signupNav = document.querySelector('.signup-nav');
const logoutNav = document.querySelector('.logout-nav');
const rightPanel = document.querySelector('.right-panel');

let datatest = [{
    name: "Ricky",
    message: "test",
    date: "20/11/22",
    id: 1
}]


let postdata = [
    {
	Id: "3",
	User_id: "222",
	Category: "category",
	Title: "title3",
	Content: "content",
	Date: "22/12/22",
	Likes: "likes",
	Dislikes: "dislikes"
},
{
	Id: "4",
	User_id: "maddie",
	Category: "JavaScript",
	Title: "title4",
	Content: "content4    Nulla aenean id tortor massa ante. Arcu massa felis, nibh nuncfames vel nunc. Nulla aenean id tortor massa ante. Arcu massa felis, nibh nunc fames vel nunc.",
	Date: "22/12/22",
	Likes: "likes",
	Dislikes: "dislikes"
}
]

commentsdata = [
{
    Id: "id",
    Post_id: "postID",
    User_id: "userID",
    Content: 'content',
    Date: "Date",
    Likes: "Likes",
    Dislikes: "Dislikes"
}
]

userdata = [{
    User_id: "userID",
    Username: "maddiewesst"
}]


function createPost(postdata) {

    document.querySelector('#title').innerHTML = postdata.Title
    document.querySelector('#username').innerHTML = postdata.User_id
    document.querySelector('#date').innerHTML = postdata.Date
    document.querySelector('.category').innerHTML = postdata.Category
    document.querySelector('.full-content').innerHTML = postdata.Content
}

function createComments(commentsdata) {
    commentsdata.map(({Id, Post_id, User_id, Content, Date, Likes, Dislikes}) =>{
  var commentWrapper = document.createElement("div");
  commentWrapper.className = "comment-wrapper"
  postContainer.appendChild(commentWrapper)
  var userImg = document.createElement("img");
  userImg.src = "./frontend/assets/profile1.svg"
  commentWrapper.appendChild(userImg)
  var comment = document.createElement("div");
  comment.className = "comment"
  commentWrapper.appendChild(comment)
  var commentUser = document.createElement("div");
  commentUser.className = "comment-username"
  commentUser.innerText = User_id
  comment.appendChild(commentUser)
  var commentSpan = document.createElement("span");
  commentSpan.innerHTML = Content
  comment.appendChild(commentSpan)
})
}

function createPosts(postdata) {

    postdata.map(({Id, User_id, Category, Title, Content, Date}) => {
        var post = document.createElement("div");
        post.className = "post"
        post.setAttribute("id", Id)
        postsContainer.appendChild(post)
        var title = document.createElement("div");
        title.className = "title"
        title.innerText = Title
        post.appendChild(title)
        var author = document.createElement("div");
        author.className = "author"
        post.append(author)
        var img = document.createElement("img");
        img.src = "./frontend/assets/profile1.svg"
        author.appendChild(img)
        var user = document.createElement("div");
        user.className = "post-username"
        user.innerHTML = User_id
        author.appendChild(user)
        var date = document.createElement("div");
        date.className = "date"
        date.innerText = Date
        author.appendChild(date)
        var content = document.createElement("div");
        content.className = "post-body"
        content.innerText = Content
        post.append(content)  
        var commentsWrapper = document.createElement("div");
        commentsWrapper.className = "comments-wrapper"
        post.appendChild(commentsWrapper)
        var likesDislikesWrapper = document.createElement("div");
        likesDislikesWrapper.className = "likes-dislikes-wrapper"
        commentsWrapper.appendChild(likesDislikesWrapper)
        var likesWrapper = document.createElement("div");
        likesWrapper.className = "likes-wrapper"
        likesDislikesWrapper.appendChild(likesWrapper)
        var likesImg = document.createElement("img");
        likesImg.src = "./frontend/assets/like3.svg"
        likesWrapper.appendChild(likesImg)
        var likes = document.createElement("div");
        likes.className = "likes"
        likes.innerText = "3"
        likesWrapper.appendChild(likes)
        var dislikesWrapper = document.createElement("div");
        dislikesWrapper.className = "likes-wrapper dislike"
        likesDislikesWrapper.appendChild(dislikesWrapper)
        var dislikesImg = document.createElement("img");
        dislikesImg.src = "./frontend/assets/dislike4.svg"
        dislikesWrapper.appendChild(dislikesImg)
        var dislikes = document.createElement("div");
        dislikes.className = "dislike"
        dislikes.innerText = "0"
        dislikesWrapper.appendChild(dislikes)
        var comments = document.createElement("div");
        comments.className = "comments"
        commentsWrapper.appendChild(comments)
        var commentsImg = document.createElement("img");
        commentsImg.src = "./frontend/assets/comment.svg"
        comments.appendChild(commentsImg)
        var comment = document.createElement("div");
        comment.className = "comment"
        comment.innerText = "3" + " Comments"
        comments.appendChild(comment)
    })
}

function createUsers(userdata) {
    userdata.map(({User_id, Username}) => {
        var users = document.createElement("div");
        users.className = "users"
        rightPanel.appendChild(users)
        var user = document.createElement("div");
        user.className = "user"
        users.appendChild(user)
        var userImg = document.createElement("img");
        userImg.src = "./frontend/assets/profile4.svg"
        user.appendChild(userImg)
        var username = document.createElement("p");
        username.innerText = Username
        user.appendChild(username)


    })
}

var conn;
var msg = document.getElementById("chat-input");
var log = document.querySelector(".chat")

function appendLog(container, msg, date) {
    var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
    log.appendChild(container);
    container.append(msg);
    msg.append(date)
   
    if (doScroll) {
        log.scrollTop = log.scrollHeight - log.clientHeight;
    }
}

//Sign in
document.querySelector('.signin-btn').addEventListener("click", function() {
    // createPosts(postdata)
    // createUsers(userdata)
    document.querySelector('.profile').innerHTML = "username"
    if (window["WebSocket"]) {
        conn = new WebSocket("ws://" + document.location.host + "/ws");
        conn.onclose = function (evt) {
            // var item = document.createElement("div");
            // item.innerHTML = "<b>Connection closed.</b>";
            // appendLog(item);
        };

        

        datatest.map(({name,message, date, id}) => {
            var receiverContainer = document.createElement("div");
            receiverContainer.className = "receiver-container"
            var receiver = document.createElement("div");
            receiver.className = "receiver"
            receiver.innerText = message
            var date = document.createElement("div");
            date.className = "chat-time"
            date.innerText = "date+time"
            appendLog(receiverContainer, receiver, date);
        } )
        conn.onmessage = function (evt) {
            var senderContainer = document.createElement("div");
            senderContainer.className = "sender-container"
            var sender = document.createElement("div");
            sender.className = "sender"
            sender.innerText = evt.data
            var date = document.createElement("div");
            date.className = "chat-time"
            date.innerText = "date+time"
            appendLog(senderContainer, sender, date);

        };
    } else {
        var item = document.createElement("div");
        item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
        appendLog(item);
    }
    // e.preventDefault()
    const emailUsername = document.querySelector('#email-username').value
    const signinPassword = document.querySelector('#signin-password').value
    let data = {
        emailUsername: emailUsername,
        password: signinPassword
    }
    console.log("login: ", data)

    signinContainer.style.display = "none"
    signupNav.style.display = "none"
    contentWrapper.style.display = "flex"  
    logoutNav.style.display = "flex"
})

//Sign up/Sign in button + link
document.querySelector('#signup-link').addEventListener('click', function() {
    signinContainer.style.display = "none"
    registerContainer.style.display = "block"
})
document.querySelector('#signin-link').addEventListener('click', function() {
    signinContainer.style.display = "block"
    registerContainer.style.display = "none"
})

const signupBtn = document.querySelector('.signup-btn')
signupBtn.addEventListener("click", function() {

    if (signupBtn.innerHTML === "SIGN UP") {
        signupBtn.innerHTML = "Sign In";
        signinContainer.style.display = "none"
        registerContainer.style.display = "block"
    } else {
      signupBtn.innerHTML = "SIGN UP";
      signinContainer.style.display = "block"
      registerContainer.style.display = "none"
    }

})

//Register
document.querySelector(".register-btn").addEventListener("click", function(e) {
    e.preventDefault()

    const fname = document.querySelector("#fname").value
    const lname = document.querySelector("#lname").value
    const email = document.querySelector("#email").value
    const username = document.querySelector("#register-username").value
    const age = document.querySelector("#age").value
    const gender = document.querySelector("#gender").value
    const password = document.querySelector("#register-password").value

    let data = {
        fname: fname,
        lname: lname,
        email: email,
        username: username,
        age: age,
        gender: gender,
        password: password
    }
    console.log("register:", data)

    registerContainer.style.display = "none"
    contentWrapper.style.display = "flex"  
    logoutNav.style.display = "flex"
    signupNav.style.display = "none"
})

//New post button
document.querySelector(".new-post-btn").addEventListener("click", function() {
    postsContainer.style.display = "none"
    postContainer.style.display = "none"
    createPostContainer.style.display = "flex"
})

//Create new post
document.querySelector(".create-post-btn").addEventListener("click", function() {
    const title = document.querySelector("#create-post-title").value
    const body = document.querySelector("#create-post-body").value
    const category = document.querySelector("#create-post-categories").value
    let postdata = {
        title: title,
        body: body,
        category: category
    }
    console.log("create post:", postdata)
    createPostContainer.style.display = "none"
    postsContainer.style.display = "flex"
})

//Open post
let post = document.querySelector(".post")
        post.addEventListener("click", function() {
            console.log(post.id)

            createPost(postdata[post.id])
            createComments(commentsdata)




    
    postsContainer.style.display = "none"
    postContainer.style.display = "flex"
})

//Comments
document.querySelector(".send-comment-btn").addEventListener("click", sendComment)
document.querySelector("#comment-input").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        sendComment();
    }
})

function sendComment() {
    let comment = document.querySelector("#comment-input").value
    commentsdata = {
        Id: "id",
        Post_id: "postID",
        User_id: "userID",
        Content: comment,
        Date: "Date",
        Likes: "Likes",
        Dislikes: "Dislikes"
    }
    document.querySelector("#comment-input").value = ""
    console.log("comments:", commentsdata)
}


//Go back to home page when click on logo
document.querySelector(".logo").addEventListener("click", function() {
    createPostContainer.style.display = "none"
    postContainer.style.display = "none"
    postsContainer.style.display = "flex"
})

//Log Out
document.querySelector(".logout-btn").addEventListener("click", function() {
    signinContainer.style.display = "block"
    registerContainer.style.display = "none"
    contentWrapper.style.display = "none"  
    signupNav.style.display = "flex"
    logoutNav.style.display = "none"

})