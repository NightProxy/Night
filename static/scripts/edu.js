document.head = document.head || document.getElementsByTagName('head')[0];

function changeFavicon(src) {
 var link = document.createElement('link'),
     oldLink = document.getElementById('dynamic-favicon');
 link.id = 'dynamic-favicon';
 link.rel = 'shortcut icon';
 link.href = src;
 if (oldLink) {
  document.head.removeChild(oldLink);
 }
 document.head.appendChild(link);
};
      function reload() {
        document.getElementById("iframeId").src = document.getElementById("iframeId").src;
      }
     function back() {
       document.getElementById("iframeId").contentWindow.history.back();
     }
    function forward() {
      document.getElementById("iframeId").contentWindow.history.forward();
    }
    function hide() {
      var hidediv = document.getElementById('browser');
      if (hidediv.style.display === "none") {
        hidediv.style.display = "block";
      } else {
        hidediv.style.display = "none";
      }
    }
    function togglemenu() {
      var menu = document.getElementById("mySidebar")
      if (menu.style.visibility === "hidden") {
        menu.style.visibility = "visible";
      } else {
        menu.style.visibility = "hidden";
      }
    }
      function setIframe() {
        let encodedUrl = sessionStorage.getItem("encodedUrl");
        encodedUrl = "/static/ghost/" + encodedUrl;
        console.log(encodedUrl);
       document.querySelector("#iframeid").src = encodedUrl;
      };
      function setthemes() {
 if (localStorage.theme == "default") {
  themefile.href = "/static/index.css";
  if (localStorage.cloak == "off") {
   changeFavicon('../favicon.ico');
  };
 } else if (localStorage.theme == "noir") {
  themefile.href = "/static/css/themes/noir/noir.css";
 } else if (localStorage.theme == "void") {
  themefile.href = "/static/css/themes/void/void.css";
 } else if (localStorage.theme == "ip") {
  themefile.href ="/static/css/themes/ironprime/ironprime.css";
  logo.src = "/static/css/themes/fire/firethemelogo.png";
 } else if (localStorage.theme == "xg") {
  themefile.href ="/static/css/themes/xgames/xgames.css";
 } else if (localStorage.theme == "stealth") {
  themefile.href ="/static/css/themes/stealth/stealth.css";
 } else if (localStorage.theme == "fg") {
  themefile.href ="/static/css/themes/froggermans/froggermans.css";
 } else if (localStorage.theme == "ghost") {
  themefile.href ="/static/css/themes/ghost/ghost.css";
 } else if (localStorage.theme == "midnight") {
  themefile.href ="/static/css/themes/midnight/midnight.css";
 } else if (localStorage.theme == "fire") {
  themefile.href = "/static/css/themes/fire/fire.css";
  if (localStorage.cloak == "off") {
   changeFavicon('/static/css/themes/fire/firefavicon.ico');
  };
 } else if (localStorage.theme == "meteor") {
  themefile.href = "/static/css/themes/meteor/meteor.css";
 } else {
  themefile.href = "/static/index.css";
 }
};
function setcloaks() {
 if (localStorage.cloak == "drive") {
 changeFavicon('./images/favicon/drive.png');
 document.title = "My Drive - Google Drive";
 } else if (localStorage.cloak == "classroom") {
  changeFavicon('./images/favicon/classroom.png');
  document.title = "Home";
 } else if (localStorage.cloak == "google") {
  changeFavicon('./images/favicon/google.png');
  document.title = "Google";
 } else if (localStorage.cloak == "gmail") {
  changeFavicon('./images/favicon/gmail.png');
  document.title = "Inbox";
 };
};

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

function initializeTitleUrlList() {
  if (!localStorage.getItem('titleUrlList')) {
  localStorage.setItem('titleUrlList', JSON.stringify([])); // Initialize an empty array if it doesn't exist
  }
  }
  
  // This function saves the title and URL from the iframe to the localStorage list
  function saveIframeTitleUrlToList() {
  const iframe = document.getElementById('iframeId');
  try {
  const iframeTitle = iframe.contentDocument.title;
  const iframeUrl = iframe.src;
  
  const titleUrlObject = { title: iframeTitle, url: iframeUrl };
  
  let titleUrlList = JSON.parse(localStorage.getItem('titleUrlList'));
  titleUrlList.push(titleUrlObject);
  localStorage.setItem('titleUrlList', JSON.stringify(titleUrlList));
  
  displayTitleUrlList(); // Update the display list after adding new title/url
  } catch (exception) {
  console.error('Cannot access iframe document:', exception);
  }
  }
  
  // This function updates the display of the title/url list under the div tag
  function displayTitleUrlList() {
  var listDiv =  document.getElementById('dropdown-container');
  let titleUrlList = JSON.parse(localStorage.getItem('titleUrlList')); // Get the list from localStorage
  
  // Construct a string of list items with the title as label and URL as a clickable link
  var listHtml = '<ul>';
  titleUrlList.forEach((item, index) => {
  listHtml += `<li>${item.title} - <a href="#" class="iframe-link" data-index="${index}">${item.url}</a></li>`;
  });
  listHtml += '</ul>';
  
  document.getElementById('dropdown-container').appendChild(listHtml);
  
  // Add click event listeners to each link
  const links =  document.getElementById('dropdown-container').getElementsByClassName('iframe-link');
  for (let link of links) {
  link.addEventListener('click', function(event) {
  event.preventDefault();
  const index = this.dataset.index;
  const url = titleUrlList[index].url;
  document.getElementById('iframeId').src = url;
  });
  }
  }
  
  // Add click event listener to the button
  document.getElementById('bookmarkbtn').addEventListener('click', saveIframeTitleUrlToList);
  
  // Initialize the title/url list when the document is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
  initializeTitleUrlList();
  displayTitleUrlList(); // Display the list on initial load
  });
setIframe();