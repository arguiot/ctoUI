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

    configure(views: OptionsInitiator) {
        return Object.fromEntries(
            Object.entries(views)
            .map(entry => {
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

            parent.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"))
            parent.querySelectorAll(".nav-link").forEach(el => el.classList.remove("active"))

            const selector = (event.currentTarget as any).hash
            parent.querySelector(selector)?.classList.add("active")
            parent.querySelector(`.nav-link[aria-controls=${selector.slice(1)}]`)?.classList.add("active")
        }
        return (
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs" id="cmdOptions" role="tablist">
                        {
                            Object.keys(this.value).map((key, index) => <li className="nav-item" key={key}>
                                <a className={`nav-link ${index == 0 ? "active" : ""}`} href={ `#${encodeURIComponent(key)}` } role="tab" aria-controls={ encodeURIComponent(key) } onClick={ setTab }>
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
                            Object.keys(this.value).map((key, index) => <div className={`tab-pane ${index == 0 ? "active" : ""}`} id={ encodeURIComponent(key) } role="tabpanel" aria-labelledby={ `${encodeURIComponent(key)}-tab` } key={key}>
                                <p className="card-text" ref={el => {
                                    if (el != null) {
                                        render(this.value[key].render(el), el, this.value[key])
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

interface OptionsViews {
    [key: string]: ViewType
}
interface OptionsInitiator {
    [key: string]: (new(name: string) => ViewType)
}

export function Options(options: OptionsInitiator) {
    return (name: string) => new OptionsClass(name, options)
}