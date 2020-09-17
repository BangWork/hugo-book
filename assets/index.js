(function () {
    var menu = document.querySelector("aside.book-menu nav")
    var toc = document.querySelector(".book-page-aside-inner")
    var zoomContainer = document.querySelector(".book-zoom-container");

    if (document.readyState === 'complete') {
        domReady();
    } else {
        document.addEventListener("DOMContentLoaded", domReady);
    }
    addEventListener("resize",changeMenuHeight)

    addEventListener("scroll", function (event) {
        changeMenuHeight()
        tippy.hideAll()
        hiddenZoom();
    })
    
    addEventListener("click",function(event){
        var target = event.target;
        if(!target || target.tagName.toLowerCase() !== "img"){
            return;
        }
        if(!target.parentNode || target.parentNode.tagName.toLowerCase() !== "figure"){
            return;
        }
        var cloneImage = target.cloneNode();
        zoomImage(cloneImage)
    })
    zoomContainer.addEventListener("click", function(event){
        hiddenZoom();
    })

    addEventListener("beforeunload", function(event) {
        localStorage.setItem("menu.scrollTop", menu.scrollTop);
    });

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
    var pdfPopover =document.querySelector("#exportPDFPopover");
    if(pdfPopover){
        tippy("[for='pdf-control']", {
            content: document.querySelector("#exportPDFPopover").innerHTML,
            appendTo: () => document.body,
            allowHTML: true,
            triggeor: 'click',
            interactive: true,
            theme: "light-border",
            placement: "bottom-end",
            offset:[16, 0]
        })
    }

    var headerSearchInput = document.querySelector(".book-header input");
    headerSearchInput.addEventListener("focus", function () {
        var searchControl = document.querySelector("#search-control");
        searchControl.checked = true;
    })

    function removeZoomImage(){
        var childLength = zoomContainer.childNodes.length;
        if(childLength){
            zoomContainer.removeChild(zoomContainer.childNodes[0])
        }
    }

    function hiddenZoom(){
        removeZoomImage()
        if(!zoomContainer.classList.contains("hidden")){
            zoomContainer.classList.add("hidden")
        }
    }
    function zoomImage(cloneImage){
        removeZoomImage();
        zoomContainer.appendChild(cloneImage);
        if(zoomContainer.classList.contains("hidden")){
            zoomContainer.classList.remove("hidden")
        }
    }    


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
                if(!menu.classList.contains("fixed")){
                    unsetHeight()
                    menu.classList.add("fixed")
                    toc.classList.add("fixed")
                }
            } else {
                setHeightToFit(bodyRect.height,headerHeight)
                if(menu.classList.contains("fixed")){    
                    menu.classList.remove("fixed")
                    toc.classList.remove("fixed")
                }
            }
        }
    }
    function domReady(){
        changeMenuHeight();
        menu.scrollTop = localStorage.getItem("menu.scrollTop");
    }
}())