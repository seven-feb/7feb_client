import {useEffect, useState} from "react";

/**
 * Axios를 사용하여 HTTP 요청을 수행하는 사용자 정의 React 훅입니다.
 *
 * @param {Object} configObj - 요청을 구성하는 객체입니다.
 * @param {Function} configObj.axiosInstance - Axios 인스턴스입니다. HTTP 요청을 보내는 데 사용됩니다.
 * @param {String} configObj.method - HTTP 요청 메소드입니다. 예: 'GET', 'POST' 등.
 * @param {String} configObj.url - 요청을 보낼 URL입니다.
 * @param {Object} [configObj.requestConfig={}] - Axios 요청에 추가할 설정 객체입니다. 헤더, 타임아웃 등을 설정할 수 있습니다.
 *
 * @returns {Array} 응답 데이터, 오류 메시지, 로딩 상태, 요청을 다시 보내는 함수를 요소로 하는 배열을 반환합니다.
 *   - response: Axios 요청으로부터 받은 응답 데이터입니다. 초기값은 빈 배열([])입니다.
 *   - error: 요청 중 발생한 오류 메시지입니다. 초기값은 빈 문자열('')입니다.
 *   - loading: 요청의 로딩 상태입니다. 요청이 진행 중이면 true, 완료되면 false입니다.
 *   - refetch: 요청을 수동으로 다시 보내는 함수입니다. 이 함수를 호출하면 요청이 다시 실행됩니다.
 *
 * @example
 * const [response, error, loading, refetch] = useAxios({
 *   axiosInstance: axios,
 *   method: 'GET',
 *   url: 'https://api.example.com/data',
 *   requestConfig: { headers: { 'Authorization': 'Bearer your-token-here' } }
 * });
 *
 * if (loading) return <p>로딩 중...</p>;
 * if (error) return <p>오류 발생: {error}</p>;
 * return (
 *   <div>
 *     <p>데이터: {JSON.stringify(response)}</p>
 *     <button onClick={refetch}>다시 불러오기</button>
 *   </div>
 * );
 */
export default function useAxios(configObj) {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);

    const refetch = () => setReload(prev => prev + 1);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal,
                });
                // console.log(res);
                setResponse(res.data);
                setError("");
            } catch (err) {
                // console.log(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // 함수 호출
        fetchData();

        // Cleanup Fn : 컴포넌트 언마운트 or useEffect 재실행 전 요청 취소
        return () => controller.abort();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    return [response, error, loading, refetch];
}