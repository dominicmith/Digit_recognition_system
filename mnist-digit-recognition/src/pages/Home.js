import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';
import Loader from '../components/Loader';

const Home = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = (data) => {
        setLoading(false);
        setResult(data.predicted_digit); // Adjust this based on your API response structure
    };

    return (
        <div>
            <Header />
            <ImageUploader onUpload={handleUpload} />
            {loading && <Loader />}
            {result && <ResultDisplay result={result} />}
            <Footer />
        </div>
    );
};

export default Home;
