import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss'
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 300), 
    []
  )

  const onClickClean = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return ( 
    <div className={styles.root}>
      <input ref={inputRef} className={styles.input} type="text" placeholder="Поиск пиццы..." onChange={onChangeInput} value={value} />
      { !value ?
          <svg 
          className={styles.icon}
          height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
          :
          <svg 
            className={styles.icon}
            onClick={onClickClean}
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
        }
    </div>
   );
}
 
export default Search;