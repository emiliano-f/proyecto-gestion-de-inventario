import "./insumo.scss"
import Single from "../../components/single/Single"
import { singleItem } from "../../data"
const Insumo = () => {

    // Fetch data and send to Single Component
    return (
      <div className="item">
        <Single {...singleItem} />
      </div>
    )
}

export default Insumo
