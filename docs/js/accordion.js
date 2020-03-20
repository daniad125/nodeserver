var accs = document.getElementsByClassName("accordion");

for (let acc of accs) {
    acc.addEventListener('click', function() {
        this.classList.toggle('active');

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        }
        else {
            panel.style.display = "block";
        }
    })
}