import {ConversionPage } from './conversiones.js';
import {OperacionesPage} from './operacionesBinarios.js'

const routes = {
    "#/": {
        title: 'Conversor',
        page: ConversionPage
    },
    "#/operacionesBinarios": {
        title: 'Operaciones',
        page: OperacionesPage
    },
};

const container = document.getElementById("container");
const historial = document.getElementById("historial");

function renderPage(route) {
    container.innerHTML = '';
    container.innerHTML = route.page.template;
    route.page.init();
    document.title = route.title;
}

function navigateTo(path) {
    if (routes[path]) {
        window.location.hash = path;
        renderPage(routes[path]);
    }
}

window.addEventListener("hashchange", () => {
    const path = window.location.hash;
    if (routes[path]) {
        renderPage(routes[path]);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.getAttribute('href'));
        }
    });

  
    if (!window.location.hash || window.location.hash === "#/") {
        navigateTo("#/");
    } else {
        const path = window.location.hash;
        if (routes[path]) {
            renderPage(routes[path]);
        }
    }
});