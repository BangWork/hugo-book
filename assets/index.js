(function () {
    var menu = document.querySelector("aside.book-menu nav")
    var toc = document.querySelector(".book-page-aside-inner")
    if (document.readyState === 'complete') {
        changeMenuHeight();
    } else {
        document.addEventListener("DOMContentLoaded", changeMenuHeight);
    }
    addEventListener("resize",changeMenuHeight)

    addEventListener("scroll", function (event) {
        changeMenuHeight()
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
    function unsetHeight(){
        menu.style.height = "unset"
        toc.style.height = "unset"
    }
    function setHeightToFit(bodyHeight,headerHeight){
        menu.style.height = (bodyHeight - headerHeight + window.pageYOffset)+"px"
        toc.style.height = (bodyHeight - headerHeight + window.pageYOffset)+"px"
    }
    function changeMenuHeight(){
        var bodyRect = document.body.getBoundingClientRect();
        var headerHeight = document.querySelector(".book-header").getBoundingClientRect()["height"]
        if(bodyRect.width < 1024){
            unsetHeight()
        }else{
            if (window.pageYOffset > 80) {
                unsetHeight()
                menu.classList.add("fixed")
                toc.classList.add("fixed")
            } else {
                setHeightToFit(bodyRect.height,headerHeight)
                menu.classList.remove("fixed")
                toc.classList.remove("fixed")
            }
        }
    }
}())