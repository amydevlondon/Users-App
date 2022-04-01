import React from 'react';
import { GoLocation, GoMail } from 'react-icons/go';
import { GiSmartphone } from 'react-icons/gi';

const User = ({ picture, name, gender, dob, location, cell, email }) => {
    return (
        <article className="user">
            <div className="user-photo">
                <img src={picture.large} alt="" />
            </div>
            <div>
                <h3 className="user-name">{name.first} {name.last}</h3>
                <p>{gender}</p>
                <p>{dob.age} years old</p>
            </div>
            <div>
                <p><GoLocation className="user-icon"/>{location.city}, {location.country}</p>
                <p><GiSmartphone className="user-icon"/>{cell}</p>
                <p><GoMail className="user-icon"/>{email}</p>
            </div>
        </article>
    );
};

export default User;