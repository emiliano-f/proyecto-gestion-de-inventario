import { Link } from "react-router-dom"
import "./sidebar.scss"

function Sidebar() {
    return (
        <div className="sidebar">
            {sidebarContent.map((module) => (
                <div className="item" key={module.id}>
                <span className="title">{module.title}</span>
                {module.listItems.map((listItem) => (
                    <Link to={listItem.url} className="listItem" key={listItem.id}>
                        <img src={listItem.icon} alt="" />
                        <span className="listItemTitle">{listItem.title}</span>
                    </Link>
                ))}               
            </div>
            ))}
        </div>
    );
};

export default Sidebar

//Modificar menu
const sidebarContent = [
    {
        id: 1,
        title: "main",
        listItems: [
            {
                id: 1,
                title: "Home",
                url: "/",
                icon: "home.svg",
            },
            {
                id: 2,
                title: "Perfil",
                url: "/users/1",
                icon: "user.svg",
            },
        ],
    },
    {
        id: 2,
        title: "lists",
        listItems: [
            {
                id: 1,
                title: "Usuarios",
                url: "/users",
                icon: "user.svg",
            },
            {
                id: 2,
                title: "Inventario",
                url: "/inventory",
                icon: "product.svg",
            },
            {
                id: 3,
                title: "Órdenes",
                url: "/orders",
                icon: "order.svg",
            },
            {
                id: 4,
                title: "Tareas",
                url: "/posts",
                icon: "post2.svg",
            },
        ],
    },
    
    {
        id: 4,
        title: "Maintenance",
        listItems: [
            {
                id: 1,
                title: "Settings",
                url: "/",
                icon: "setting.svg",
            },
            {
                id: 2,
                title: "Backups",
                url: "/",
                icon: "backup.svg",
            },
        ],
    },
    {
        id: 5,
        title: "analytics",
        listItems: [
            {
                id: 1,
                title: "Charts",
                url: "/",
                icon: "chart.svg",
            },
            {
                id: 2,
                title: "Logs",
                url: "/",
                icon: "log.svg",
            },
        ],
    },
];

/*martin sidebar
return(
        <div className="Sidebar">
            <h2>Inventario</h2>
            <nav>{
                Object.keys(resources).map((module,index) => {
                    return (
                    <div key={index}>
                        <h3>modulo {module}</h3>    
                        <ol key={index}>{
                            Object.keys(resources[module]).map((item,index) => {
                                return (
                                <li key={index}>
                                    <Link key={index} to={`${module}/${item}/`}>
                                        <h4>{item}</h4>
                                    </Link>
                                </li>);
                            })
                        }</ol>   
                    </div>)
                },[resources])
            }</nav>
        </div>
    );
    */