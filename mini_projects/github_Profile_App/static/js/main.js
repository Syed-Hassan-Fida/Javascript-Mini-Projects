const API_URL = 'https://api.github.com/users/';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("florinpop17");

async function getUser(username){
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    
    createUsersCard(respData);

    getRepos(username);
}

async function getRepos(username){
    const resp = await fetch(API_URL + username + "/repos");
    const respData = await resp.json();
    
    addReposToCard(respData);
} 

function createUsersCard(user){
    
    const cardHTML = `
    <div class="card">
        <div class="img-container">
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <h3>${user.company}</h3>
            <p>${user.bio}</p>
            <ul class="info">
                <li><strong><i class="fas fa-eye"></i></strong>${user.followers}<span>Followers</span></li>
                <li><strong><i class="fas fa-heart"></i></strong>${user.following}<span>Following</span></li>
                <li><strong><i class="fab fa-github"></i></strong>${user.public_repos}<span>Public Repos</span></li>
            </ul>
            
            <div id="repos">

            </div>
        </div>
    </div>`; 

    main.innerHTML = cardHTML;

}

function addReposToCard(repos){
    const reposEl = document.getElementById("repos");
    // for slicing tha dtaa
    // repos.sort((a, b)=>b.stargazers_count - a.stargazers_count).slice(0, 9).forEach((repo) => {
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5).forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);  
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user){
        getUser(user);
        //getUser("florinpop17");
        search.value = '';
    } 
});