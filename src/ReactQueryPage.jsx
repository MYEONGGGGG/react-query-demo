import React from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const ReactQueryPage = () => {

    const ids = [1, 2, 3, 4];

    const fetchPostDetail = (id) => {
        return axios.get(`${process.env.REACT_APP_SERVER}/${id}`);
    };

    const results = useQueries({
        queries: ids.map((id) => {
          return {
              queryKey: ["posts", id],
              queryFn: () => fetchPostDetail(id)
          }
        }),
        combine: (results) => {
            return {
                data: results.map((rs) => rs.data)
            };
        },
    });
    console.log('results => ', results);

    return (
        <div>
            Result
        </div>
    );
}

export default ReactQueryPage;


// backup
// const ReactQueryPage = () => {
//
//     const { data, isLoading, isError, error, refetch } = usePostQuery(1);
//
//     if (isLoading) {
//         return <h1>Loading...</h1>
//     }
//
//     if (isError) {
//         return <h1>{ error.message }</h1>
//     }
//
//     return (
//         <div>
//             <div>{ data.title }</div>
//
//             {/*{ data?.map(item => <div key={item.id}> { item.title }  </div> ) }*/}
//             <button onClick={refetch}>API 호출</button>
//         </div>
//     );
// }
//
// export default ReactQueryPage;