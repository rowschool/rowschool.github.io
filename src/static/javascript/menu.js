document.addEventListener('DOMContentLoaded', function(event) {
    if (window.location.href.startsWith("http://localhost:8080/")) {
        $(".nav .nav-pills").prepend("<a href=\"/new-blog-post.html\"><li>New Blog Post</li></a>")
    }

    var menuButton = document.getElementById("mobile-menu-button");
    var menuDropdown = document.getElementById("mobile-menu-dropdown");

    if (!menuButton || !menuDropdown) {
        return;
    }

    menuButton.addEventListener("click", function() {
        var isOpen = menuDropdown.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuDropdown.setAttribute("aria-hidden", String(!isOpen));
    });

    menuDropdown.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            menuDropdown.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuDropdown.setAttribute("aria-hidden", "true");
        });
    });
});
