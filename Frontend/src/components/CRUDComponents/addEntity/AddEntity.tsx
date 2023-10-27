
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
    )
}

    // Array de empleados
    const [empList, setEmpList] = useState([{employee:''}]);
    
    // Maneja los cambios en cada empleado del array
    const handleEmpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number)=>{
        const {name, value} = e.target;
        const list = [...empList];
        (list[index] as { [key: string]: string })[name] = value;
        setEmpList(list);

    }
    // Agrega un campo de empleado
    const handleAddEmp =()=>{
        setEmpList([...empList, {employee:''}]);
    }
    // Elimina determinado empleado
    const handleDeleteEmp = (index:number) => {
        const list=[...empList];
        list.splice(index,1);
        setEmpList(list);
    }


{empList.map((x,i)=>{
    return(
        <Form.Group className="mb-3" controlId="formGridEmpleado" key={i}>
            <Form.Label>Empleado {i+1}</Form.Label>
            <div className="employee">
                <Form.Control type="string" placeholder="Ingrese empleado" onChange={e => handleEmpChange(e,i)} />
                {empList.length!==1 &&
                    <Button className="btn btn-danger" onClick={()=> handleDeleteEmp(i)}>-</Button>
                }
                {empList.length-1===i &&
                    <Button className="btn btn-success" onClick={handleAddEmp}>+</Button>
                }
            </div>
        </Form.Group>
    );
})}