// Login 

let logIn = document.getElementById("login");
let userEstatus = document.getElementById("estatus");
let loader = document.getElementById("loader");


logIn.addEventListener('click', (e) => {
    e.preventDefault()
    let emailIn = document.getElementById("email").value;
    let passIn = document.getElementById("password").value;
    userValidation(emailIn, passIn)
})

async function userValidation(email, password) {
    try {
        let response = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        const validation = data.find(u => u.email === email)

        if (validation && validation.password === password) {
            localStorage.setItem("user", JSON.stringify(validation))
            userEstatus.innerHTML = `<p>Nice tu see you again, ${validation.name}!</p>`
            loader.style.display = "block"
            setTimeout(() => {
                window.location.href="../../pages/main_page/index.html";
            }, 3000);
        } else {
            userEstatus.innerHTML = `<p style= "color: red">Train again, summoner...</p>`
        }

    } catch (error) {
        console.error(`Your method has a problem: ${error}`);
    };

}
