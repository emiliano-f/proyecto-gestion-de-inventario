
import { Link } from "react-router-dom"
import "./sidebar.scss"
import { Accordion} from "react-bootstrap";

function Sidebar() {
    return (
        <div className="sidebar">
            {sideBarContent.map((section) => (
                <div className="section" key={section.id}>
                    <div className="accordion">Este acocordisoid</div>
                    <span className="sectionTitle">{section.title}</span>
                    {section.modules.map((module,index) => (
                        <Accordion key={index}>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <Link to={module.url} className="module" key={module.id}>
                                        <img src={module.icon} alt="" />
                                        <span className="moduleTitle">{module.title}</span>
                                    </Link>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <PrintItems module={module}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>                 
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Sidebar

function PrintItems({module}: any){
    var r = <></> 
    if("items" in module){
        r = module.items.map((item,index)=>(
            <Link key={index} to={item.url} className="item">
                <span className="itemTitle">{item.title}</span>
            </Link>
        ))
    }
    return r;
}

/**
 * Lista de Secciones{Modulos{Items}}
 */

export const sideBarContent = [
    {
        id: 1,
        title: "Principal",
        modules: [
            {
                id: 1,
                title: "Home",
                url: "/",
                icon: "/home.svg",
            },
            {
                id: 2,
                title: "Perfil",
                url: "/users/1",
                icon: "/user.svg",
            },
        ],
    },
    {
        id: 2,
        title: "Modulos",
        modules: [
            {
                id: 1,
                title: "Usuarios",
                url: "/users",
                icon: "/usersubtables.svg",
            },
            {
                id: 2,
                title: "Inventario",
                url: "/inventario/",
                items: [
                    {
                        id: 1,
                        title: "Insumos",
                        url: "/inventario/insumos",
                    },
                    {
                        id: 2,
                        title: "Tipos de Insumo",
                        url: "/inventario/tipos-insumo",
                    },
                    {
                        id: 3,
                        title: "Herramientas",
                        url: "/inventario/tipos-insumo",
                    },
                    {
                        id: 4,
                        title: "Tipos de Herramientas",
                        url: "/inventario/tipos-insumo",
                    },
                ],
                icon: "/inventory-whitex.png",
            },
            {
                id: 3,
                title: "Órdenes",
                url: "/orders",
                icon: "/order.svg",
            },
            {
                id: 4,
                title: "Tareas",
                url: "/posts",
                icon: "/post2.svg",
            },
        ],
    },
    {
        id: 4,
        title: "Opciones",
        modules: [
            {
                id: 1,
                title: "Opciones",
                url: "/",
                icon: "/setting.svg",
            },
            {
                id: 2,
                title: "Backups",
                url: "/",
                icon: "/backup.svg",
            },
        ],
    },
    {
        id: 5,
        title: "Analiticas",
        modules: [
            {
                id: 1,
                title: "Charts",
                url: "/",
                icon: "/chart.svg",
            },
            {
                id: 2,
                title: "Logs",
                url: "/",
                icon: "/log.svg",
            },
        ],
    },
];