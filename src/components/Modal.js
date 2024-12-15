import React, { useEffect, useState } from "react";
import "../styles/Modal.css";

const Modal = ({ character, onClose }) => {
    const [episodes, setEpisodes] = useState([]); // Holds the episode information

    // Fetch episode details from episode URLs
    useEffect(() => {
        const fetchEpisodes = async () => {
            if (character && character.episode.length > 0) {
                try {
                    const fetchPromises = character.episode.map((url) =>
                        fetch(url).then((res) => res.json())
                    );
                    const results = await Promise.all(fetchPromises);

                    // Extract episode names and numbers
                    const episodeDetails = results.map((episode) => {
                        const episodeNumber = episode.url.split("/").pop(); // Extract the episode number from the URL
                        return { name: episode.name, number: episodeNumber };
                    });

                    setEpisodes(episodeDetails);
                } catch (error) {
                    console.error("Failed to fetch episodes:", error);
                }
            }
        };

        fetchEpisodes();
    }, [character]);

    if (!character) return null; // Do not display the modal if no character is selected

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
                                Episode {episode.number}: {episode.name}
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
