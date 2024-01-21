export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)
        
        document.body.style.backgroundImage = `url(assets/images${window.location.pathname}.png)`
    
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