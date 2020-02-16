let url = window.location.toString();
let body = document.body;

const onLoad = document.body.onload = function() {
  setTimeout( function() {
  let preloader = document.getElementById('page-preloader')
  preloader.classList.toggle('load')
 }, 2000)
}

let getUserName = (url) => {
	let urlArr = url.split('=');
  let userName = urlArr[1];
  if (userName == undefined) {
  	userName = 'anastasiamiheeva'
  }
  return userName;
}
 
fetch(`https://api.github.com/users/${getUserName(url)}`)
.then(res => res.json())
.then(json => {
  let userAvatar = json.avatar_url;
  let userLogin = json.login;
  let userBio = json.bio;
  let userUrl = json.html_url;
  
  let getUserLogin = () => {
    let createLoginEl = document.createElement('h1');
    createLoginEl.innerHTML = userLogin;
    body.appendChild(createLoginEl);
  }

  let getUserAvatar = () => {
    let createImgEl = document.createElement('img');
    createImgEl.src = userAvatar;
    body.appendChild(createImgEl);
  }

  let getUserBio = () => {
    let createBioEl = document.createElement('p');
    createBioEl.innerHTML = userBio;
    body.appendChild(createBioEl)
  }

  let getUserUrl = () => {
    let createUrlEl = document.createElement('a');
    let linkText = document.createTextNode('Профиль');
    createUrlEl.href = userUrl;
    createUrlEl.appendChild(linkText);
    body.appendChild(createUrlEl)
  }
  getUserLogin();
  getUserAvatar();
  getUserBio();
  getUserUrl()
})

.catch(err => alert(`${err} (Информация о пользователе не доступна)`))