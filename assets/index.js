(function () {
    addEventListener("scroll", function (event) {
        var menu = document.querySelector("aside.book-menu nav")
        var toc = document.querySelector(".book-page-aside-inner")
        var main = document.querySelector("main.container")
        var scrollTop = window.scrollY
        if (scrollTop > 80) {
            menu.classList.add("fixed")
            toc.classList.add("fixed")
        } else {
            menu.classList.remove("fixed")
            toc.classList.remove("fixed")
        }
        tippy.hideAll()
    })
    tippy("[for='toc-control']", {
        content: document.querySelector("#tocPopover").innerHTML,
        appendTo: () => document.body,
        allowHTML: true,
        trigger: 'click',
        interactive: true,
        theme: "light-border",
        placement: "bottom-end",
        offset:[16, 0]
    })
    var headerSearchInput = document.querySelector(".book-header input");
    headerSearchInput.addEventListener("focus", function () {
        var searchControl = document.querySelector("#search-control");
        searchControl.checked = true;
    })
}())