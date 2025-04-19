import './ItemCard.css'
import Tshirt from '../../assets/tshirt.svg'
import Cap from '../../assets/cap.svg'
import Sneakers from '../../assets/Sneakers.svg'
import Shorts from '../../assets/shorts.svg'

function ItemCard() {
  return (
    <section className="item__grid">
      <div className="item__card">
        <p className="item__label">T-Shirt</p>
        <img src={Tshirt} alt="Tshirt" className="item__image" />
      </div>

      <div className="item__card">
        <p className="item__label">Cap</p>
        <img src={Cap} alt="Hat" className="item__image" />
      </div>

      <div className="item__card">
        <p className="item__label">Sneakers</p>
        <img src={Sneakers} alt="Shoes" className="item__image" />
      </div>

      <div className="item__card">
        <p className="item__label">Shorts</p>
        <img src={Shorts} alt="Shorts" className="item__image" />
      </div>
    </section>
  )
}

export default ItemCard
