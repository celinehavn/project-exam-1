// Start the page with a loading page
(function () {
    setTimeout(() => {
        document.getElementById("loading_page").style.display = 'none';
    }, 1000);
}());

function open_menu() {
    document.getElementById("mobile_menu").style.width = "100%";
}

function close_menu() {
    document.getElementById("mobile_menu").style.width = "0%";
}

// Time for the next launch
let count_date = new Date();
var forword = true;

// Helper function for lunch time
let lunchDate = (date_local) => {
    let s1 = date_local.split("-") // 2020-05-27T16:33:00-04:00"
    let s2 = s1[2].split("T")
    let s3 = s2[1].split(":");

    count_date.setFullYear(parseInt(s1[0]), parseInt(s2[0]), parseInt(s1[2]));
    count_date.setHours(count_date.getHours() + parseInt(s3[0]))
    count_date.setMinutes(count_date.getMinutes() + parseInt(s3[1]))
    count_date.setSeconds(count_date.getSeconds() + parseInt(s3[2]))
    document.getElementById('time').innerText =
        `${count_date.getDay()}d:${count_date.getHours()}h:${count_date.getMinutes()}m:${count_date.getSeconds()}s`;
}


let next_launches = () => {
    forword = true;
    document.getElementById("display").innerText = "Time to next launch";
    // Fetch date for the next launch
    fetch('https://api.spacexdata.com/v2/launches/next')
        .then(result => result.json())
        .then((response) => {
            lunchDate(response.launch_date_local)
        })
        .catch(err => console.log(err));
}

let latest_launches = () => {
    forword = false;
    document.getElementById("display").innerText = "Previous launch was";
    fetch('https://api.spacexdata.com/v2/launches/latest')
        .then(result => result.json())
        .then((response) => {
            lunchDate(response.launch_date_local)
        })
        .catch(err => console.log(err));
}



// Execute javascript immediately after a page has been loaded
window.onload = () => {
    // Load next lunch
    next_launches();

    // Get navigation menu objects
    const Menu = {
        home: document.getElementById("home-link"),
        galley: document.getElementById("gallery-link"),
        about: document.getElementById("about-link"),
        contact: document.getElementById("contact-link")
    }

    // Get navigation menu objects
    const MobileMenu = {
        home: document.getElementById("home_mobile"),
        galley: document.getElementById("gallery_mobile"),
        about: document.getElementById("about_mobile"),
        contact: document.getElementById("contact_mobile")
    }


    // Pages objects
    const Pages = {
        home: document.getElementById("home"),
        galley: document.getElementById("gallery"),
        about: document.getElementById("about"),
        contact: document.getElementById("contact")
    }

    // Remove all activated pages
    const unSelect = (menu) => {
        Object.entries(menu).forEach((value, key, o) => {
            Pages[value[0]].style.display = 'none';
            Menu[value[0]].classList.remove('active');
        })
    }

    // Add a custom css
    const container = () => {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = 'pages'
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './css/contact.css';
        link.media = 'all';
        head.appendChild(link);
    }

    // Change activated pages
    Object.entries(Menu).forEach((value) => {
        value[1].onclick = () => {
            unSelect(Menu);
            Pages[value[0]].style.display = 'block';
            value[1].classList.add('active')
            if (value[0] !== "home"){
                if (document.getElementById('pages') === null)
                    container()
                document.querySelector('footer').style.display = 'none'
            } else {
                document.querySelector('footer').style.display = 'flex';
                document.getElementById("pages").remove();
            }
        }
    });

    // Mobile
    Object.entries(MobileMenu).forEach((value) => {
        value[1].onclick = () => {
            unSelect(MobileMenu);
            Pages[value[0]].style.display = 'block';
            if (value[0] !== "home") {
                if (document.getElementById('pages') === null)
                    container()
            } else {
                document.getElementById("pages").remove();
            }
            close_menu()
        }
    });

    // Countdown the localtime
    setInterval(function () {
        if (forword)
            count_date.setMilliseconds(count_date.getMilliseconds() - 1000);
        else
            count_date.setMilliseconds(count_date.getMilliseconds() + 1000);

        document.getElementById('time').innerText =
            `${count_date.getDay()}d:${count_date.getHours()}h:${count_date.getMinutes()}m:${count_date.getSeconds()}s`;
    }, 1000);
}