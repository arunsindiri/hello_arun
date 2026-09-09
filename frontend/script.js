const nameInput = document.getElementById("nameInput");
const button = document.getElementById("helloButton");
const message = document.getElementById("message");

button.addEventListener("click", async function () {

    const name = nameInput.value;

    const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    });

    const data = await response.json();

    message.textContent = "Hello " + data.name;

    setTimeout(function () {
        message.textContent = "";
    }, 2000);
});
