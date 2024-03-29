const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);

    // console.log(data);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    // console.log(err);
    if (err.response.status == 404) {
      createErrorCard('User not found');
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=pushed_at');

    addReposToCard(data);
  } catch (err) {
    createErrorCard('Problem fetching repositories');
  }
}

function createUserCard(user) {
  const cardHTML = `<div class="card">
        <div>
          <img
            src="${user.avatar_url}"
            alt="${user.name}"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${user.name ? user.name : 'Not specified'}</h2>
          <p>${user.bio ? user.bio : 'Not specified'}</p>

          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos"></div>
        </div>
      </div>`;

  main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
  const cardHTML = `<div class="card">
        <div class="error">
          <h2>${msg}</h2>
        </div>
      </div>`;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = '';
  }
});
