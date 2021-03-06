const overview = document.querySelector(".overview");
const username = "PatricTomlinson";
const repoList = document.querySelector(".repo-list");

const gitData = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  displayUserInfo(data);
};

gitData();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overview.append(div);
  repoShow();
};

const repoShow = async function () {
  const repoFetch = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
  const repoData = await repoFetch.json();
  repoInfo(repoData);
};

const repoInfo = function (repos) {
  for (const repo of repos) {
    //This is the loop//
    const repoItem = document.createElement("li");
    //this is the line for creating list items//
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};
