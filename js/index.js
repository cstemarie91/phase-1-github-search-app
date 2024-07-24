
document.addEventListener("DOMContentLoaded", () => {

const form = document.querySelector('form');
form.addEventListener('submit', searchGitHub)





function searchGitHub(event){
    event.preventDefault();
    const request = document.querySelector('#search').value;


    fetch(`https://api.github.com/search/users?q=${request}`,{
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
       // Replace with your token if required
    }//headers
})//fetch

  .then(response => response.json())
  .then(data => {
    renderGitHubUsers(data.items);
    // Handle the data received from GitHub
  })//.then
  .catch(error => {
    console.error('Error fetching GitHub data:', error);
  });//.catch
}//SearchGitHub

function renderGitHubUsers(users){
const userList = document.querySelector('#user-list')
userList.innerHTML = '';

users.forEach(user => {  
    const theUser = document.createElement ('div');

    const userName = document.createElement('h2');
    userName.textContent = user.login

    const userAvatar = document.createElement('img')
    userAvatar.src = user.avatar_url
    userAvatar.style.width = `200px`;

    const userUrl = document.createElement('p');
    userUrl.textContent = user.url;
    

    theUser.appendChild(userName)
    theUser.appendChild(userAvatar);
    theUser.appendChild(userUrl);
    userList.appendChild(theUser)
    
    theUser.addEventListener('click', () => {
        searchGitRepos(user.login)
    });
});//foreach
console.log('Rendered the Users')


function searchGitRepos(username){

    fetch(`https://api.github.com/users/${username}/repos`, {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        }
    })//fetch
    .then(response => response.json())
    .then(data => {
        renderGitHubRepos(data)
    })//.then
}//searchGitRepos
    function renderGitHubRepos(repos){
        const repoList = document.querySelector('#repos-list')
        repoList.innerHTML = '';
        
        repos.forEach(repo => {
            const userRepo = document.createElement('div');
            
            const repoName = document.createElement('h3');
            repoName.textContent = repo.name;
      
            const repoUrl = document.createElement('a');
            repoUrl.href = repo.html_url;
            repoUrl.textContent = repo.html_url;
      
            userRepo.appendChild(repoName);
            userRepo.appendChild(repoUrl);
            //userRepo.appendChild(data)
            repoList.appendChild(userRepo)


        })//repoForEach
    }//renderGitHubRepos
}//renderGitHubUsers
});//DOMContent