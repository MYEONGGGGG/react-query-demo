import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ReactQueryPage = () => {

    const fetchPost = () => {
        return axios.get(`${ process.env.REACT_APP_SERVER }`)
    };

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPost,
        retry: 1,
        select: (data) => { return data.data }
    });

    // console.log('success: ', data, isLoading);
    // console.log('fail: ', isError, error);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>{ error.message }</h1>
    }

    return (
        <div>
            { data.map(item =>
                <div key={item.id}>
                    { item.title }
                </div>
            ) }
        </div>
    );
}

export default ReactQueryPage;