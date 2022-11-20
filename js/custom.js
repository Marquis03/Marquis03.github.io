function snackbarShow(text, showAction, duration) {
    const sa = typeof showAction !== "undefined" ? showAction : false;
    const dur = typeof duration !== "undefined" ? duration : 3000;
    const position = "top-left";
    const bg = "#6f42c1";
    Snackbar.show({
        text: text,
        backgroundColor: bg,
        showAction: sa,
        duration: dur,
        pos: position,
    });
}