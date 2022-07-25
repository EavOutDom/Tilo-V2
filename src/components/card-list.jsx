import React, { useEffect, useState } from "react";
import SingleCard from "./single-card";
import axios from "axios";
import Modal from "./modal";
const CardList = ({ taskId }) => {
    const [cards, setCards] = useState([]);
    const [nameCard, setNameCard] = useState("");
    const [descCard, setDescCard] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [tempId, setTempId] = useState(null);

    const fetchCards = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3001/tasks/${taskId}/cards`
            );
            const data = response.data;
            setCards(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleCreateUpdateCards = async () => {
        if (isUpdate) {
            try {
                const response = await axios.patch(
                    `http://localhost:3001/cards/${tempId}`,
                    {
                        name: nameCard,
                        description: descCard,
                    }
                );
                const data = response.data;
                setCards(cards.map((card) => (card.id === tempId ? {...card, name: nameCard, description: descCard} : card)));
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.post(
                    `http://localhost:3001/tasks/${taskId}/cards`,
                    {
                        name: nameCard,
                        description: descCard,
                        date: new Date().toLocaleDateString(),
                        taskId: taskId,
                    }
                );
                const data = response.data;
                setCards([...cards, data]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleUpdateCard = (id) => {
        const selectedCard = cards.find((card) => card.id === id);
        setNameCard(selectedCard.name);
        setDescCard(selectedCard.description);
        setTempId(id);
        setIsUpdate(true);
        setShowModal(true);
    };

    const handleDeleteCard = (id) => {
        try {
            axios.delete(`http://localhost:3001/cards/${id}`);
            setCards(cards.filter((card) => card.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                {cards.map((card) => {
                    return (
                        <SingleCard
                            key={card.id}
                            card={card}
                            handleDelete={handleDeleteCard}
                            handleUpdate={handleUpdateCard}
                        />
                    );
                })}
            </div>

            <div>
                <button onClick={() => setShowModal(true)}>ADD NEW</button>
            </div>
            {showModal && (
                <Modal>
                    <h1 className={"text-center"}>
                        {isUpdate ? "Update" : "Create"} New Card
                    </h1>

                    <div className="flex flex-col">
                        <label htmlFor="name">Name</label>
                        <input
                            placeholder="name..."
                            className={"p-1 rounded-sm"}
                            value={nameCard}
                            onChange={(e) => {
                                setNameCard(e.target.value);
                            }}
                        />
                        <label htmlFor="name">Description</label>
                        <textarea
                            placeholder="description..."
                            className={"p-1 rounded-sm"}
                            value={descCard}
                            onChange={(e) => {
                                setDescCard(e.target.value);
                            }}
                        />
                    </div>
                    <div className={"absolute bottom-2 right-2"}>
                        <button
                            className="w-16 bg-blue-500 text-white rounded-md py-1 mr-1"
                            onClick={() => {
                                setShowModal(false);
                                handleCreateUpdateCards();
                            }}
                        >
                            {isUpdate ? "Save" : "Create"}
                        </button>
                        <button
                            className="w-16 bg-red-500 text-white rounded-md py-1 ml-1"
                            onClick={() => {
                                setShowModal(false);
                                setIsUpdate(false);
                                setNameCard("");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CardList;
