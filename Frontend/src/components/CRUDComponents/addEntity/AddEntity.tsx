
const AddEntity = ()=>{
    
    // Array de entidades
    const [entList, setEntList] = useState([{entity:''}]);
    
    // Maneja los cambios en cada entleado del array
    const handleEntChange = (e: React.ChangeEvent<HTMLInputElement>, index: number)=>{
        const {name, value} = e.target;
        const list = [...entList];
        (list[index] as { [key: string]: string })[name] = value;
        setEntList(list);

    }
    // Agrega un campo de entidades
    const handleAddEnt =()=>{
        setEntList([...entList, {entloyee:''}]);
    }
    // Elimina determinado entidades
    const handleDeleteEnt = (index:number) => {
        const list=[...entList];
        list.splice(index,1);
        setEntList(list);
    }

    entList.map((x,i)=>{
        return (
            <Form.Group className="mb-3" controlId="formGridEntleado" key={i}>
                <Form.Label>Entleado {i+1}</Form.Label>
                <div className="entloyee">
                    <Form.Control type="string" placeholder="Ingrese entleado" onChange={e => handleEntChange(e,i)} />
                    <Form.Select
                        name={props.fieldName}
                        className="form-select"
                        value={currOption}
                        required={props.required}
                        onChange={changeHandler}
                        >
                        <option value={-1} disabled>Elegir {getSingular(itemName)}</option>
                        {list.map(value => (
                            <option value={value.id} key={value.id}>{
                                value.nombre!? value.nombre : value.id
                            }</option>
                        ))}
                    </Form.Select>
                    {entList.length!==1 &&
                        <Button className="btn btn-danger" onClick={()=> handleDeleteEnt(i)}>-</Button>
                    }
                    {entList.length-1===i &&
                        <Button className="btn btn-success" onClick={handleAddEnt}>+</Button>
                    }
                </div>
            </Form.Group>
        );
    }
}

const SelectList = ({props}:Props) => {
    interface Item {
        id: number;
        nombre: string;
        [key: string]: any; // Esto permite otros atributos de cualquier tipo
    }

    const [list, setList] = useState<Item[]>([]);
    const itemName = getUri(props.fieldName);
    
    useEffect(() => {
        const fetchData = async () => {
            await ListItems(setList, itemName)
            .catch((error) => {setMessage("Se ha producido un error al crear el campo select",error)}) 
        };
        fetchData();
    }, [itemName]);
    
    const [currOption,setCurrOption] =  useState(-1);    
    useEffect(()=>{
        list.forEach((row)=>{
            if(row.nombre === props.defaultValue){
                setCurrOption(Number(row.id));
            }
        })
    },[list,setList]);
    const changeHandler = e => setCurrOption(e.target.value);
    
    return ( 
        
    )
}

    


{
    return(
        
    );
})}