import React, { useEffect, useState } from "react";
import "../styles/Modal.css";

const Modal = ({ character, onClose }) => {
    const [episodes, setEpisodes] = useState([]); // Bölüm isimlerini tutar

    // Episode URL'lerinden bölüm bilgilerini çek
    useEffect(() => {
        const fetchEpisodes = async () => {
            if (character && character.episode.length > 0) {
                try {
                    const fetchPromises = character.episode.map((url) =>
                        fetch(url).then((res) => res.json())
                    );
                    const results = await Promise.all(fetchPromises);
                    setEpisodes(results.map((episode) => episode.name)); // Sadece bölüm isimlerini al
                } catch (error) {
                    console.error("Failed to fetch episodes:", error);
                }
            }
        };

        fetchEpisodes();
    }, [character]);

    if (!character) return null; // Eğer karakter seçili değilse, modal gösterilmez

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>Character Details</h2>
                <p><strong>Name:</strong> {character.name}</p>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Location:</strong> {character.location.name}</p>
                <h3>Episodes</h3>
                {episodes.length > 0 ? (
                    <ul>
                        {episodes.map((episode, index) => (
                            <li key={index}>
                                Episode {index + 1}: {episode}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading episodes...</p>
                )}
            </div>
        </div>
    );
};

export default Modal;
