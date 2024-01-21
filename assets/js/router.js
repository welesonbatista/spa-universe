export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)
        

        if(window.location.pathname == "/explore") {
            document.body.style.backgroundImage = "url(assets/images/explore.png)"
        } else if(window.location.pathname == "/universe") {
            document.body.style.backgroundImage = "url(assets/images/universe.png)"
        } else {
            document.body.style.backgroundImage = "url(assets/images/home.png)"
        }
    

        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        fetch(route).then(data => data.text()).then(data => {
            return document.querySelector('#app').innerHTML = data
        })
    }


}