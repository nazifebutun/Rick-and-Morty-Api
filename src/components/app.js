import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal"; 
import "../styles/App.css";
import rickgun from '../images/rickgun.png';
import mortygun from '../images/mortygun.png';
const App = () => {
    const [allCharacters, setAllCharacters] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [selectedCharacter, setSelectedCharacter] = useState(null); 
    const [filter, setFilter] = useState(""); 

    const charactersPerPage = 8; 

    
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
            <h1>Rick and Morty<br />Characters</h1>


            {}
            <div style={{ position: "fixed", top: "190px", left: "50%", transform: "translateX(-50%)", width: "600px", marginBottom: "20px"}}>
                <input
                    type="text"
                    placeholder="Filter by name or status or species"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        padding: "8px 35px 8px 8px",  
                        width: "100%", 
                        backgroundColor: "rgba(0, 184, 230, 0.3)", 
                        border: "none",
                        borderRadius: "4px", 
                        color: "white", 
                        border: "1px solid #ffffff",
                        fontFamily: "monospace",
                        fontSize: "15px",
                        textShadow: "3px 3px 3px rgba(255, 203, 0, 50.0)",
                    }}
                />
                <i 
                    className="fas fa-search"  // FontAwesome arama ikonu
                    style={{
                        position: "absolute", 
                        right: "-25px", 
                        top: "50%", 
                        transform: "translateY(-50%)", 
                        color: "white"
                    }} 
                ></i>
            </div>
            
            <style>{`
                input:focus {
                    outline: none; 
                    border: 1px solid #ccc; 
                }
            `}</style>

            {}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : currentCharacters.length > 0 ? (
                <>
                    {}
                    <div style={{ marginTop: "250px",marginBottom:"40px", display: "grid", gridTemplateColumns: "repeat(4, 1fr", gap:"20px"}}>
                        {currentCharacters.map((char) => (
                            <div
                                key={char.id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    backgroundColor: "rgba(5, 88, 109)",
                                    boxShadow: "10px 4px 10px rgba(0, 0, 0, 0.8)",
                                }}
                                onClick={() => setSelectedCharacter(char)}
                            >
                                <h3 className="custom-heading">{char.name}</h3>
                                <p style={{
                                    fontFamily: "monospace",
                                    fontSize: "15px",
                                    textShadow: "3px 3px 3px rgba(255, 203, 0, 50.0)", 
                                    margin: "5px",
                                }}>
                                    Status: {char.status}
                                </p>
                                <p style={{
                                    fontFamily: "monospace",
                                    fontSize: "15px",
                                    textShadow: "3px 3px 3px rgba(255, 203, 0, 50.0)",
                                    margin: "10px",
                                }}>
                                    Species: {char.species}
                                </p>
                                <img src={char.image} alt={char.name} style={{ width: "120px", height: "120px" }} />
                            </div>
                        ))}
                    </div>

                    {}
                    
                    <div style={{ marginTop: "50px", display: "flex", justifyContent: "center", gap: "10px" }}>
                    
                        <button 
                            onClick={handlePreviousPage} 
                            disabled={currentPage === 1} 
                            style={{
                                background: "none",  
                                border: "none",      
                                cursor: "pointer"    
                            }}
                        >
                            <img 
                                src={rickgun} 
                                alt="Previous"
                                style={{
                                    width: "60px",  
                                    height: "60px",
                                }}
                            />
                        </button>
                        
                        <p
                            style={{
                                fontFamily: "monospace",
                                fontSize: "19px",
                                color: "white",
                                textShadow: "3px 3px 3px rgba(255, 203, 0, 50.0)",
                            }}

                        >
                            Page {currentPage} of {totalPages}
                            
                        </p>

                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages} 
                            style={{
                                background: "none",  
                                border: "none",      
                                cursor: "pointer"   
                            }}
                        >
                            <img 
                                src={mortygun} 
                                alt="Next"
                                style={{
                                    width: "60px",  
                                    height: "60px", 
                                }}
                            />
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
