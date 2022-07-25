import React from "react";

const SingleCard = ({ card, handleUpdate, handleDelete }) => {
    // console.log(card);
    return (
        <div className="bg-white rounded-md p-2 my-1">
            <div>
                <h1 className={"font-semibold"}>{card.name}</h1>
                <h1 className="font-light text-sm text-gray-400">
                    {card.date}
                </h1>
                <h1 className="font-normal">{card.description}</h1>
            </div>
            <div>
                <button onClick={() => handleUpdate(card.id)}>Update</button>
                <button onClick={() => handleDelete(card.id)}>Delete</button>
            </div>
        </div>
    );
};

export default SingleCard;
