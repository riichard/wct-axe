var a11y = window.parent.a11y || window.parent.parent.a11y;
if(!a11y) {
    throw "A11Y ERROR: Could not find parent a11y object";
} else {
    a11y.injectBdd(window);
}
