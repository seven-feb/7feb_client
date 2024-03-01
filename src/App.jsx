import React, {useEffect} from 'react';
import './App.css';
import useAxios from './hooks/useAxios';

export default function App() {
    // useAxios 훅 초기화. baseURL을 포함한 config 객체를 전달합니다.
    const {response, error, loading, fetchData} = useAxios({
        baseURL: "https://jsonplaceholder.typicode.com/posts"
    });

    useEffect(() => {
        // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
        fetchData({url: 'https://jsonplaceholder.typicode.com/posts', method: 'GET'});
    }, [fetchData]);

    return (
        <div className="App">
            <header className="App-header">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {response && (
                    <div>
                        <p>Data fetched successfully:</p>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
            </header>
        </div>
    );
}