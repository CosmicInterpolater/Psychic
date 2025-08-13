// components/DateInput.js - Date Input Component
import React from 'react';

const DateInput = ({ birthDate, setBirthDate, onGenerate }) => {
    return (
        <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            marginTop: '10vh'
        }}>
            <h1 style={{
                fontSize: '3rem',
                color: 'white',
                marginBottom: '1rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
                ✨ Cosmic Reader ✨
            </h1>
            <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem'
            }}>
                Discover your cosmic blueprint and celestial destiny
            </p>

            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <label style={{
                    display: 'block',
                    color: 'white',
                    fontSize: '1.1rem',
                    marginBottom: '1rem'
                }}>
                    Enter your birth date:
                </label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    style={{
                        padding: '12px',
                        fontSize: '1.1rem',
                        borderRadius: '10px',
                        border: 'none',
                        marginBottom: '1.5rem',
                        width: '100%',
                        maxWidth: '300px'
                    }}
                />
                <br />
                <button
                    onClick={onGenerate}
                    disabled={!birthDate}
                    style={{
                        padding: '12px 30px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        borderRadius: '50px',
                        border: 'none',
                        background: birthDate ? 'linear-gradient(45deg, #ff6b6b, #feca57)' : '#ccc',
                        color: 'white',
                        cursor: birthDate ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s ease',
                        boxShadow: birthDate ? '0 5px 20px rgba(255, 107, 107, 0.4)' : 'none'
                    }}
                >
                    🔮 Reveal Your Cosmic Truth
                </button>
            </div>
        </div>
    );
};

export default DateInput;
