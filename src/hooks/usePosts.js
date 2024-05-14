import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchPost = (postId) => {
    return axios.get(`${ process.env.REACT_APP_SERVER }/${postId}`);
};

/** custom hook */
export const usePostQuery = (postId) => {
    return useQuery({
        queryKey: ['posts', postId], //key 값을 가져온다.
        queryFn: () => fetchPost(postId),
        retry: 1,
        select: (data) => { return data.data },

        // staleTime: 60000, // 1분간 api 호출 금지
        // gcTime: 10000, // 10초간 캐시 유지
        // stale < gctime 로 시간을 설정하는게 좋다.
        // 이유? 캐시가 유지되는 시간이 짧으면 또 다시 api 를 빈번하게 요청해야하며, 로딩 화면을 반복적으로 노출해야하기때문

        // refetchOnMount: true // true 설정 시, 마운트 시 마다 refetch를 실행하는 옵션(화면 마운트할 때 마다 api를 매번 호출)
        // refetchOnWindowFocus: true, // true 설정 시, 브라우저가 해당 캐시에 대한 데이터를 재요청하는 것으로 이를 통해 캐시가 항상 최신의 상태를 유지
        // enabled: false // 초기에 API를 호출하지 않늗다. // 기본값은 true
    });
};