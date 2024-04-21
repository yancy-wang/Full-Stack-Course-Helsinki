import React from 'react'
const Filter = ({searchItem, handleSearchChange})=>{
    return (
        <div>
            Filter shown with<input value={searchItem} onChange={handleSearchChange} />
        </div>
    );
}
export default Filter;

