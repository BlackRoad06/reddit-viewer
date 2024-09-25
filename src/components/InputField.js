import React, { useState }  from 'react'
import { useDispatch } from 'react-redux';
import { searchPostPreviews } from '../features/postPreviews/postPreviewsSlice';
import './InputField.css';
import searchIcon from "./search-svgrepo-com.svg";

export default function InputField() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    
    const handleSearch = ()=> {
        if (query){
            dispatch(searchPostPreviews(query));
            setQuery("");
        }
    }
    const handleKeyPress = (event) => {
        if (event.code === 'Enter') { // Change from event.key to event.code
            handleSearch();
        }
    };


    return (
        <div className='input-field-container'>
            <input    
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}   
            onKeyDown={handleKeyPress}         
            placeholder="Search posts"
            className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                <img src={searchIcon} alt="Search" className="search-icon" />
            </button>
        </div>
    )

}
