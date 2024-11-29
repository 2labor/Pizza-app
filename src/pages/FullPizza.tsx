import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {

  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6728138d270bd0b975543f8e.mockapi.io/Items/${id}`);
        setPizza(data);
      } catch(e){
        alert('Ошибка при получениии пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, [])

  if(!pizza) {
    return 'Загрузка..'
  }

  return ( 
    <div className="container">
      <img src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
   );
}
 
export default FullPizza;