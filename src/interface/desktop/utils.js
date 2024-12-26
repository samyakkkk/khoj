console.log(`%c %s`, "font-family:monospace", `
 __  __     __  __     ______       __        _____      __
/\\ \\/ /    /\\ \\_\\ \\   /\\  __ \\     /\\ \\      /\\  __ \\   /\\ \\
\\ \\  _"-.  \\ \\  __ \\  \\ \\ \\/\\ \\   _\\_\\ \\     \\ \\  __ \\  \\ \\ \\
 \\ \\_\\ \\_\\  \\ \\_\\ \\_\\  \\ \\_____\\ /\\_____\\     \\ \\_\\ \\_\\  \\ \\_\\
  \\/_/\\/_/   \\/_/\\/_/   \\/_____/ \\/_____/      \\/_/\\/_/   \\/_/

Greetings traveller,

I am ✨Khoj✨, your open-source, personal AI copilot.

See my source code at https://github.com/khoj-ai/khoj
Read my operating manual at https://docs.khoj.dev
`);


window.appInfoAPI.getInfo((_, info) => {
    let khojVersionElement = document.getElementById("about-page-version");
    if (khojVersionElement) {
        khojVersionElement.innerHTML = `<code>${info.version}</code>`;
    }
    let khojTitleElement = document.getElementById("about-page-title");
    if (khojTitleElement) {
        khojTitleElement.innerHTML = '<b>Khoj for ' + (info.platform === 'win32' ? 'Windows' : info.platform === 'darwin' ? 'macOS' : 'Linux') + '</b>';
    }
});

function toggleNavMenu() {
    let menu = document.getElementById("khoj-nav-menu");
    menu.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
document.addEventListener('click', function (event) {
    let menu = document.getElementById("khoj-nav-menu");
    let menuContainer = document.getElementById("khoj-nav-menu-container");
    let isClickOnMenu = menuContainer?.contains(event.target) || menuContainer === event.target;
    if (menu && isClickOnMenu === false && menu.classList.contains("show")) {
        menu.classList.remove("show");
    }
});

async function populateHeaderPane() {
    let userInfo = null;
    try {
        userInfo = await window.userInfoAPI.getUserInfo();
    } catch (error) {
        console.log("User not logged in");
    }

    let username = userInfo?.username ?? "?";
    let user_photo = userInfo?.photo;
    let is_active = userInfo?.is_active;
    let has_documents = userInfo?.has_documents;

    // Populate the header element with the navigation pane
    return `
        <a class="khoj-logo" href="/">
            <img class="khoj-logo" src="./assets/icons/khoj_logo.png" alt="Khoj"></img>
        </a>
        <nav class="khoj-nav">
        ${userInfo && userInfo.email
            ? `<div class="khoj-status-box">
              <span class="khoj-status-connected"></span>
               <span class="khoj-status-text">Connected to server</span>
               </div>`
            : `<div class="khoj-status-box">
              <span class="khoj-status-not-connected"></span>
               <span class="khoj-status-text">Not connected to server</span>
               </div>`
        }
            ${username ? `
                <div id="khoj-nav-menu-container" class="khoj-nav dropdown">
                    ${user_photo && user_photo != "None" ? `
                        <img id="profile-picture" class="${is_active ? 'circle subscribed' : 'circle'}" src="${user_photo}" alt="${username[0].toUpperCase()}" referrerpolicy="no-referrer">
                    ` : `
                        <div id="profile-picture" class="${is_active ? 'circle user-initial subscribed' : 'circle user-initial'}" alt="${username[0].toUpperCase()}">${username[0].toUpperCase()}</div>
                    `}
                    <div id="khoj-nav-menu" class="khoj-nav-dropdown-content">
                        <div class="khoj-nav-username"> ${username} </div>
                        <a onclick="window.supportUsAPI.showSettings()" class="khoj-nav-link">
                        <img class="khoj-nav-icon" src="./assets/icons/support.svg" alt="Support Us"></img>
                        Support Us
                        </a>
                        <a onclick="window.navigateAPI.navigateToWebHome()" class="khoj-nav-link">
                        <img class="khoj-nav-icon" src="./assets/icons/open-link.svg" alt="Open Host Url"></img>
                        Open App
                        </a>
                    </div>
                </div>
            ` : ''}
        </nav>
    `;
}