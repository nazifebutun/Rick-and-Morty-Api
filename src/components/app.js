import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal"; 
import "../styles/App.css";

const App = () => {
    const [allCharacters, setAllCharacters] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [selectedCharacter, setSelectedCharacter] = useState(null); 
    const [filter, setFilter] = useState(""); 
    const [charactersPerPage, setCharactersPerPage] = useState(12); // Başlangıçta 12 karakter göster

    useEffect(() => {
        const fetchAllCharacters = async () => {
            try {
                setLoading(true);
                let allCharactersTemp = [];
                let page = 1;
                let totalPages = 1;

                const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
                allCharactersTemp = response.data.results;
                totalPages = response.data.info.pages;

                const fetchPromises = [];
                for (let i = 2; i <= totalPages; i++) {
                    fetchPromises.push(axios.get(`https://rickandmortyapi.com/api/character?page=${i}`));
                }

                const results = await Promise.all(fetchPromises);
                results.forEach((res) => {
                    allCharactersTemp = [...allCharactersTemp, ...res.data.results];
                });

                setAllCharacters(allCharactersTemp); 
                setError(null);
            } catch (err) {
                setError("Failed to fetch characters. Please try again.");
            } finally {
                setLoading(false); 
            }
        };

        fetchAllCharacters();
    }, []);

    const filteredCharacters = allCharacters.filter((char) =>
        char.name.toLowerCase().includes(filter.toLowerCase()) ||
        char.status.toLowerCase().includes(filter.toLowerCase()) ||
        char.species.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);

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

    // Sayfa boyutunu değiştirmek için fonksiyon
    const handlePageSizeChange = (e) => {
        setCharactersPerPage(Number(e.target.value));  // Yeni sayfa boyutunu state'e set ediyoruz
        setCurrentPage(1);  // Sayfa boyutu değiştiğinde, sayfayı 1. sayfaya sıfırlıyoruz
    };

    return (
        
        <div>
            <h1>Rick and Morty Characters</h1>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filter by name or status or species"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setCurrentPage(1); // Filtreleme sonrası sayfayı sıfırlıyoruz
                    }}
                    className="filter-input"
                />
            </div>

            {/* Sayfa boyutunu değiştirmek için seçim kutusu */}
            <div className="select">
                <select 
                    value={charactersPerPage} 
                    onChange={handlePageSizeChange} 
                    style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                    }}
                >
                    <option value={4}>4 per page</option>
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
