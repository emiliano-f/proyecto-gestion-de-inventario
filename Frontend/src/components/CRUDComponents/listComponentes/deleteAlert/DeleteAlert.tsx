import "./deleteAlert.scss"

import { UpdateItem as Update, CreateItem as Create, DeleteItem } from "../../../Api/apiService"
import { GetUrlParts } from "../../../data/FRONTURLS";
import { getSingular } from "../../../data/TRANSLATIONS";
import { setMessage } from "../messageDisplay/MessageDisplay";

import Button from 'react-bootstrap/Button'

type Props = {
    slug: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    id: number | string,
    switchChange: () => void,
}


const DeleteAlert = (props: Props) => {

    const {entity} = GetUrlParts();

    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        DeleteItem(entity, props.id.toString())
            .then((response) => {
                setMessage(`Se ha eliminado el ${getSingular(entity)} ${props.id} con exito`,null)
            })
            .catch((error) => {
                setMessage(`Ha surgido un error al eliminar el ${getSingular(entity)} ${props.id}`, error)
            })
            .finally(() => props.setOpen(false));
    };


    return (
        <div className="modal-background">
            <div className="modal-front">
                <button className="close btn dark" onClick={() => props.setOpen(false)}>X</button>
                
                <h1>Eliminar {getSingular(props.slug)}</h1>
                
                <div className="deleteAlert">
                    <p>¿Está usted seguro de que eliminar el {getSingular(props.slug)} con identificador {props.id}?</p>

                    <form method="post" onSubmit={handleDelete}>
                        <Button type="submit" className="btn btn-danger"
                            onClick={() => props.switchChange()}>
                            Eliminar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteAlert; 