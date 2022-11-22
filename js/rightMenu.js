document.onkeydown = () => {
    if ((window.event && window.event.keyCode == 123) ||
        (window.event.ctrlKey && window.event.shiftKey && window.event.keyCode == 73) ||
        (window.event.shiftKey && window.event.keyCode == 121)) {
        snackbarShow("你真坏，不能打开控制台喔!");
        return false;
    };
}

document.oncopy = () => {
    snackbarShow("复制成功");
}

var rm = {};
rm.showRightMenu = function(t, e = 0, o = 0) {
    var c = $("#rightMenu");
    c.css("top", e + "px").css("left", o + "px"),
    t ? (stopMaskScroll(), c.show()) : c.hide()
};
var rmWidth = $("#rightMenu").width(),
rmHeight = $("#rightMenu").height();
rm.reloadrmSize = function() {
    rmWidth = $("#rightMenu").width(),
    rmHeight = $("#rightMenu").height()
};
var domhref = "",
domImgSrc = "",
selectTextNow = "";
function selceText() {
    var t;
    selectTextNow = (t = document.selection ? document.selection.createRange().text: window.getSelection() + "") ? t: ""
}
function removeRightMenu() {
    rm.showRightMenu(!1),
    $("#rightmenu-mask").attr("style", "display: none")
}
function stopMaskScroll() {
    if (document.getElementById("rightmenu-mask")) {
        var t = document.getElementById("rightmenu-mask");
        t.addEventListener("mousewheel",
        function(t) {
            removeRightMenu()
        },
        !1)
    }
    if (document.getElementById("rightMenu")) {
        var t = document.getElementById("rightMenu");
        t.addEventListener("mousewheel",
        function(t) {
            removeRightMenu()
        },
        !1)
    }
}
function copyUrl(t) {
    navigator.clipboard && navigator.clipboard.writeText(t);
}
function copyPageUrl() {
    copyUrl(window.location.href),
    snackbarShow("复制本页链接地址成功"),
    removeRightMenu()
}
function rightmenuCopyText(t, e = "no-add") {
    var o;
    let c = GLOBAL_CONFIG.copyright;
    o = "add-copyright" == e && t.length > c.limitCount ? t + "\n\n\n" + c.languages.author + "\n" + c.languages.link + window.location.href + "\n" + c.languages.source + "\n" + c.languages.info: t,
    navigator.clipboard && navigator.clipboard.writeText(o),
    removeRightMenu()
}

function downloadImage(t, e) {
	removeRightMenu(),
	o = document.createElement("a");
	(o.download = e || "photo"), (o.href = t), o.click(), (rm.downloadimging = !1);
}
function searchBaidu() {
    window.open("https://www.baidu.com/s?wd=" + selectTextNow)
    removeRightMenu()
}
document.onmouseup = document.ondbclick = selceText,
    window.oncontextmenu = function (t) {
        if (document.body.clientWidth > 768) {
            if (t.ctrlKey) return !0;
            var e = t.clientX + 10,
                o = t.clientY,
                c = $(".rightMenuNormal"),
                i = $(".rightMenuOther"),
                s = $(".rightMenuPlugin"),
                r = $("#menu-copytext"),
                a = $("#menu-commenttext"),
                l = $("#menu-newwindow"),
                h = $("#menu-copylink"),
                u = $("#menu-downloadimg"),
                d = $("#menu-search"),
                g = $("#menu-searchBaidu"),
                p = $("#menu-readmode"),
                y = $("#menu-goto-comment"),
                _ = t.target.href,
                f = t.target.currentSrc,
                w = location.href.includes("articles"),
                k = !1;
            return c.show(),
                i.show(),
                document.getElementById("post") || document.getElementById("page") ? y.show() : y.hide(),
                selectTextNow && window.getSelection() ? (k = !0, r.show(), a.show(), d.show(), g.show(), i.hide()) : (r.hide(), a.hide(), g.hide(), d.hide()),
                _ || f ? (k = !0, l.show(), h.show(), i.hide(), _ && (domhref = _), f ? (domImgSrc = f, domhref = f, u.show()) : u.hide()) : (u.hide(), l.hide(), h.hide()),
                w ? p.show() : p.hide(),
                k ? s.show() : s.hide(),
                rm.reloadrmSize(),
                e + rmWidth > window.innerWidth && (e -= rmWidth),
                o + rmHeight > window.innerHeight && (o -= rmHeight),
                rm.showRightMenu(!0, o, e),
                $("#rightmenu-mask").attr("style", "display: flex"),
                !1
        }
    }, rm.downloadimging = !1;
$("#menu-backward").on("click",
function() {
    window.history.back()
}),
$("#menu-forward").on("click",
function() {
    window.history.forward()
}),
$("#menu-refresh").on("click",
function() {
    window.location.reload()
}),
$("#menu-home").on("click",
function() {
    window.location.href = window.location.origin
}),
$(".menu-link").on("click",
function() {
    removeRightMenu()
}),
function switchReadMode(t) {
    var e;
    let o = document.body;
    function c() {
        o.classList.remove("read-mode"),
        e.remove(),
        e.removeEventListener("click", c)
    }
    0 == t ? (o.classList.add("read-mode"), (e = document.createElement("button")).type = "button", e.className = "fas fa-sign-out-alt exit-readmode", o.appendChild(e), e.addEventListener("click", c)) : c(),
    removeRightMenu()
}
function replaceAll(t, e, o) {
    return t.split(e).join(o)
}
function rightMenuCommentText(t) {
    removeRightMenu();
    var e = document.getElementsByClassName("el-textarea__inner")[0],
    o = document.createEvent("HTMLEvents");
    o.initEvent("input", !0, !0);
    var c = replaceAll(t, "\n", "\n> ");
    e.value = "> " + c + "\n\n",
    e.dispatchEvent(o);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
    e.focus(),
    e.setSelectionRange( - 1, -1)
}
$("#menu-copy").on("click",
function() {
    copyPageUrl()
}),
$("#menu-newwindow").on("click",
function() {
    window.open(domhref),
    removeRightMenu()
}),
$("#menu-copylink").on("click",
function() {
    rightmenuCopyText(domhref),
    snackbarShow("已复制链接地址")
}),
$("#menu-downloadimg").on("click",
function() {
    downloadImage(domImgSrc, "小嗷犬的图片")
}),
$("#menu-copytext").on("click",
function() {
    rightmenuCopyText(selectTextNow, "add-copyright"),
    snackbarShow("复制成功"),
    removeRightMenu()
}),
$("#menu-searchBaidu").on("click",
function() {
    searchBaidu()
}),
$("#menu-commenttext").on("click",
function() {
    rightMenuCommentText(selectTextNow)
}),
$("#menu-print").on("click",
function() {
    removeRightMenu(),
    window.print()
}),
$("#menu-readmode").on("click",
function() {
    let t = document.body.classList.length;
    switchReadMode(t)
}),
$("#menu-goto-comment").on("click",
function() {
    removeRightMenu()
}),
$("#menu-radompage").on("click",
function() {
    var t = ["https://marquis03.github.io/"];
    n = Math.floor(Math.random() * t.length),
    location.href = t[n],
    window.href = n,
    removeRightMenu()
}),
$("#rightmenu-mask").on("click",
function() {
    removeRightMenu()
}),
$("#rightmenu-mask").contextmenu(function() {
    return removeRightMenu(),
    !1
}),
$(".joe_wallpaper__type-list>li").on("click",
function() {
    $(this).addClass("active"),
    $(this).siblings().removeClass("active");
    var t = "#item-" + $(this).attr("data-cid");
    $(t).addClass("item-show").siblings().removeClass("item-show")
});