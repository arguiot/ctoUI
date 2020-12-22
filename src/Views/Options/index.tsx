import {
    render,
    View,
    ViewType
} from "../View";

class OptionsClass extends View {
    element?: HTMLElement;
    value: OptionsViews

    constructor(name: string, options: OptionsInitiator) {
        super(name)
        this.value = this.configure(options)
    }

    configure(views: OptionsInitiator): OptionsViews {
        return Object.fromEntries(
            Object.entries(views)
            .map(entry => {
                if (typeof entry[1] == "object") {
                    return [entry[0], this.configure(entry[1])]
                }
                const func = entry[1]
                const view = new func(entry[0]);
                return [entry[0], view];
            })
        )
    }

    render(parent: HTMLElement) {
        this.element = parent;

        function titleCase(camelCase: string) {
            const reg = camelCase.replace( /([A-Z])/g, " $1" );
            const result = reg.charAt(0).toUpperCase() + reg.slice(1);

            return result
        }
        const setTab = (event: any) => {
            event.preventDefault()

            const tabs = parent.querySelectorAll(".tab-pane")
            tabs.forEach(el => el.classList.remove("active"));

            const links = parent.querySelectorAll(".nav-link")
            links.forEach(el => el.classList.remove("active"));

            (event.currentTarget as any).classList.add("active")

            const selector = (event.currentTarget as any).hash
            parent.querySelector(selector)?.classList.add("active")
        }
        return (
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs" id="cmdOptions" role="tablist">
                        {
                            Object.keys(this.value).map((key, index) => <li className="nav-item" key={key}>
                                <a className={`nav-link ${index == 0 ? "active" : ""}`} href={ `#${encodeURIComponent(key)}` } role="tab" onClick={ setTab }>
                                    <i className="fa fa-cog mr-2"/>
                                    { titleCase(key) }
                                </a>
                            </li>)
                        }
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content p-0">
                        {
                            Object.keys(this.value).map((key, index) => <div className={`tab-pane ${index == 0 ? "active" : ""}`} id={ encodeURIComponent(key) } role="tabpanel" key={key}>
                                <p className="card-text" ref={el => {
                                    if (el != null) {
                                        if (this.value[key] instanceof View) {
                                            const view = this.value[key] as ViewType
                                            render({ element: view.render(el), container: el, binder: view })
                                        } else {
                                            const values = Object.values(this.value[key]) as Array<ViewType>
                                            values.forEach(val => render({ element: val.render(el), container: el, binder: val }))
                                        }
                                    }
                                }}></p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

interface FinalOptionsViews {
    [key: string]: ViewType
}

interface OptionsViews {
    [key: string]: ViewType | FinalOptionsViews
}

interface FinalOptionsInitiator {
    [key: string]: (new(name: string) => ViewType)
}

interface OptionsInitiator {
    [key: string]: (new(name: string) => ViewType) | FinalOptionsInitiator
}

export function Options(options: OptionsInitiator) {
    return (name: string) => new OptionsClass(name, options)
}