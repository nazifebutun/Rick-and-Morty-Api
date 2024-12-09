import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal"; 
import "./App.css";

const App = () => {
    const [allCharacters, setAllCharacters] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [selectedCharacter, setSelectedCharacter] = useState(null); 
    const [filter, setFilter] = useState(""); 

    const charactersPerPage = 9; 

    
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
        char.name.toLowerCase().includes(filter.toLowerCase())||
        char.status.toLowerCase().includes(filter.toLowerCase())||
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

    return (
        <div>
            <h1>Rick and Morty Characters</h1>

            {}
            <input
                type="text"
                placeholder="Filter by name or status or species"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
            />

            {}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : currentCharacters.length > 0 ? (
                <>
                    {}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                        {currentCharacters.map((char) => (
                            <div
                                key={char.id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelectedCharacter(char)}
                            >
                                <h3>{char.name}</h3>
                                <p>Status: {char.status}</p>
                                <p>Species: {char.species}</p>
                                <img src={char.image} alt={char.name} style={{ width: "100px", height: "100px" }} />
                            </div>
                        ))}
                    </div>

                    {}
                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <p>
                            Page {currentPage} of {totalPages}
                        </p>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No characters found.</p>
            )}

            {}
            <Modal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
        </div>
    );
};

export default App;
