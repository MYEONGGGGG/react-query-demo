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
        staleTime: 60000, // 1분간 api 호출 금지
        gcTime: 10000, // 10초간 캐시 유지
        // stale < gctime 로 시간을 설정하는게 좋다.
        // 이유? 캐시가 유지되는 시간이 짧으면 또 다시 api 를 빈번하게 요청해야하며, 로딩 화면을 반복적으로 노출해야하기때문
        select: (data) => { return data.data },
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