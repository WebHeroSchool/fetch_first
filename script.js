let url = window.location.toString();
let body = document.body;
let preloader = document.getElementById('page-preloader')
let newDate = new Date();

let getUserName = (url) => {
	let urlArr = url.split('=');
  let userName = urlArr[1];
  if (userName == undefined) {
  	userName = 'anastasiamiheeva'
  }
  return userName;
}

let user = getUserName(url)

let getNewDate = new Promise((resolve, reject) => {
  setTimeout(() => newDate ? resolve(newDate) : reject('Время не определено'), 2000)
})
 
let userInfo = fetch(`https://api.github.com/users/${user}`)

Promise.all([userInfo, getNewDate])
.then(([infoData, todayDate]) => {
  receiveData = infoData;
  receiveTodayDate = todayDate;
})
.then(res => receiveData.json())
.then(json => {
  let userAvatar = json.avatar_url;
  let userLogin = json.login;
  let userBio = json.bio;
  let userUrl = json.html_url;
  if (userLogin != undefined) {
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

    let getTodayDate = () => {
      let createDateEl = document.createElement('p');
      createDateEl.innerHTML = receiveTodayDate;
      body.appendChild(createDateEl);
    }

    preloader.classList.toggle('load')
    getUserLogin();
    getUserAvatar();
    getUserBio();
    getUserUrl()
    getTodayDate()
  } 
  else {
    alert('Пользователь не найден')
  }  
  
})

.catch(err => alert(`${err} (Информация о пользователе не доступна)`))