
import { Link } from "react-router-dom"
import "./sidebar.scss"
import { Accordion} from "react-bootstrap";
import {data as sideBarContent} from "../../data/data.tsx";
function Sidebar() {
    return (
        <div className="sidebar">
            {sideBarContent.map((section) => (
                <div className="section" key={section.id}>
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