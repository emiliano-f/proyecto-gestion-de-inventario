import "./deleteItem.scss"
import { DeleteItem as Delete,GetUrlParts } from "../../Api/apiService"; 

const DeleteItem = (row,setOpen) => {
    const {item:itemName} = GetUrlParts();
    
    const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Delete(itemName,row.id);
    };

    return (
        <div className="addItem">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>X</span>
                <h1>Eliminar {itemName}</h1>
                <h2>¿Está usted seguro de que quiere eliminar el {itemName} con identificador {row.id}?</h2>
                <form method="post" onSubmit={handleDelete}>
                    <button type="submit" onClick={() => setOpen(false)}>Eliminar</button>
                </form>
            </div>
        </div>
    );
};

export default DeleteItem;