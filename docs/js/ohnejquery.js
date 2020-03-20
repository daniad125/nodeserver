"use strict"

var tabs = ['main', 'members', 'gen', 'ranges', 'sitemap', 'help'];

function main(ele) {
    document.getElementById(ele.name).style.display = 'block';
    for (let tab of tabs) {
        if (tab != ele.name) {
            document.getElementById(tab).style.display = 'none';
        }
    }
}

function burger(el) {
    el.classList.toggle('burger_active');
    let navs = document.getElementsByClassName('nav');
    for (let nav of navs) {
        nav.classList.toggle('nav_active');
    }
}