import React from 'react'
const nStyle = {
    backgroundColor: 'lightgrey',
    color: 'green',
    padding: '10px',
    marginBottom: '10px',
    border: '2px solid green',
    borderRadius: '5px',
  };

const Notification = ({message}) =>
{
    return(
        <div style = {nStyle}>
            {message}
        </div>
    );
}


export default Notification;
