//Nazife Bütün

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal"; 
import "../styles/App.css";

const App = () => {
    // State definitions
    const [allCharacters, setAllCharacters] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [selectedCharacter, setSelectedCharacter] = useState(null); 
    const [filter, setFilter] = useState(""); 
    const [charactersPerPage, setCharactersPerPage] = useState(12); // Default characters per page

    useEffect(() => {
        const fetchAllCharacters = async () => {
            try {
                setLoading(true);
                let allCharactersTemp = [];
                let page = 1;
                let totalPages = 1;

                // Fetch the first page
                const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
                allCharactersTemp = response.data.results;
                totalPages = response.data.info.pages;

                // Fetch remaining pages
                const fetchPromises = [];
                for (let i = 2; i <= totalPages; i++) {
                    fetchPromises.push(axios.get(`https://rickandmortyapi.com/api/character?page=${i}`));
                }

                // Merge results from all pages
                const results = await Promise.all(fetchPromises);
                results.forEach((res) => {
                    allCharactersTemp = [...allCharactersTemp, ...res.data.results];
                });

                setAllCharacters(allCharactersTemp); // Update state with all characters
                setError(null);
            } catch (err) {
                setError("Failed to fetch characters. Please try again.");
            } finally {
                setLoading(false); 
            }
        };

        fetchAllCharacters(); // Fetch characters from the API
    }, []);

    // Multi-filtering mechanism
    const filteredCharacters = allCharacters.filter((char) => {
        const terms = filter.toLowerCase().split(" ").filter(Boolean); // Split filter into terms
        return terms.every((term) => 
            char.name.toLowerCase().includes(term) ||
            char.status.toLowerCase().includes(term) ||
            char.species.toLowerCase().includes(term)
        );
    });

    // Calculate characters for the current page
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

    // Calculate total pages
    const totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    // Update characters per page
    const handlePageSizeChange = (e) => {
        setCharactersPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page after changing page size
    };

    return (
        <div>
            <h1>Rick and Morty Characters</h1>

            {/* Filter input */}
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by name or status or species"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1); // Reset to the first page after filtering
                    }}
                    className="filter-input"
                />
            </div>

            {/* Characters per page selection */}
            <div className="select">
                <select 
                    value={charactersPerPage} 
                    onChange={handlePageSizeChange}
                >
                    <option value={8}>8 per page</option>
                    <option value={12}>12 per page</option>
                    <option value={36}>36 per page</option>
                    <option value={52}>52 per page</option>
                </select>
            </div>

            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : currentCharacters.length > 0 ? (
                <>
                    {/* Display characters */}
                    <div className="character-grid">
                        {currentCharacters.map((char) => (
                            <div
                                key={char.id}
                                className="character-card"
                                onClick={() => setSelectedCharacter(char)}
                            >
                                <h3 className="custom-heading">{char.name}</h3>
                                <p className="character-status">Status: {char.status}</p>
                                <p className="character-species">Species: {char.species}</p>
                                <img src={char.image} alt={char.name} className="character-image" />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination-container">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            &lt;&lt;
                        </button>
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            &lt;
                        </button>
                        <p className="pagination-info">
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            &gt;
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            &gt;&gt;
                        </button>
                    </div>
                </>
            ) : (
                <p className="no-characters">No characters found.</p>
            )}

            <Modal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
        </div>
    );
};

export default App;
