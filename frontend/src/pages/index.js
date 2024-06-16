import React, { useEffect, useState } from 'react';
import { getData } from '../services/api';
import Header from '../components/header';
import Card from '../components/card';
import Button from '../components/button';

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await getData();
            setData(result);
        }
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <Header title="RAG App" />
            {data ? (
                <Card>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
            <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
        </div>
    );
};

export default Home;
