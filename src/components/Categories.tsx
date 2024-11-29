import React, { memo } from "react";
import { useState } from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (idx: number) => void;
}

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories: React.FC<CategoriesProps> = memo(({ value, onClickCategory }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  return ( 
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (
            <li 
            key={i}
            onClick={() => onClickCategory(i)} 
            className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          ))
        }
      </ul>
    </div>
   );
})
 
export default Categories;