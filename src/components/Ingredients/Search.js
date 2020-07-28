import React, {useState, useEffect, useRef} from 'react';
import useHttp from '../../hooks/http';
import Card from '../UI/Card';
import './Search.css';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const { onLoadIngredients } = props;
  const inputRef = useRef();

  const {isLoading, data, error, sendRequest, clear} = useHttp();

  useEffect(() => {
    const timer = setTimeout (() => {
      if(enteredFilter === inputRef.current.value){
        const queryParams = enteredFilter.length === 0 
        ? '' : `?orderBY="title"&equalTo="${enteredFilter}"`;

        sendRequest('https://react-hooks-update-409ea.firebaseio.com/ingredients.json' + queryParams, 'GET')

      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data){
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        })
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients])
    
  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input 
          ref={inputRef}
          type="text"
          value={enteredFilter}
          onChange={event =>
            setEnteredFilter(event.target.value)
          } />
        </div>
      </Card>
    </section>
  );
});

export default Search;
