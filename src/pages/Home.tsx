import React, { useCallback } from 'react';

import qs from 'qs'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories'
import SortPopup from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination';
import { list } from '../components/Sort';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounded = useRef(false)

  const categoryId = useSelector((state) => {
    return state.filter.categoryId
  });
  const sortType = useSelector((state) => {``
    return state.filter.sort
  });
  const currentPage = useSelector((state) => {``
    return state.filter.pagination
  });
  const searchValue = useSelector((state) => state.filter.searchValue)

  const { items, status } = useSelector(selectPizzaData);

  const onClickCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {


  dispatch(
    fetchPizzas(
      {
      categoryId,
      sortType,
      currentPage,
    }),
  );
  
    window.scrollTo(0,0);
  }

  useEffect(() => {
    getPizzas();
    isSearch.current = false

  }, [categoryId, sortType, currentPage, searchValue]);

  const pizzas = items.filter((obj: any) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())){
      return true
    }
    return false
  }).map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(8)].map((_,index ) => <Skeleton key={index}/>)

  useEffect(() => {
    if (isMounded.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`)
    } 
    isMounded.current = true
  }, [categoryId, sortType, currentPage])

  useEffect(() => {
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))

      const sort = list.find((obj) => {
        return  obj.sortProperty === params.sortProperty
      })

      dispatch(setFilters({...params, sort}));
      isSearch.current = true;
    }
  }, [])


  return ( 
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <SortPopup value={sortType}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (
          <div className='content__error-info'>
            <h2>Произошла ошибка 😕</h2>
            <p>К сожилению, не удалось получить питсы. Пожалуйста, попробуйте повторить попытку позже!</p>
          </div>
        ) : (
        <div className="content__items"> {( status === 'loading' ? skeletons : pizzas )}
      </div>
        )
      } 
        <div className='currentPage'>
          <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>
    </div>
   );
}
 
export default Home;