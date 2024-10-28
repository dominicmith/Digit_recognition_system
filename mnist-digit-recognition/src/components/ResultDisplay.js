import React from 'react';

const ResultDisplay = ({ result }) => {
    return (
        <div>
            <h2>Predicted Digit: {result}</h2>
        </div>
    );
};

export default ResultDisplay;
