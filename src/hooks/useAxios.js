import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

/**
 * Axios를 사용하여 HTTP 요청을 수행하고 관리하는 커스텀 React 훅.
 *
 * @param {AxiosRequestConfig} config - Axios 요청 구성 객체.
 * @returns 객체는 응답 데이터(`response`), 오류 메시지(`error`), 로딩 상태(`loading`), 요청 함수(`fetchData`)를 포함합니다.
 */
export default function useAxios(config) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Axios 인스턴스 생성
    const axiosInstance = axios.create({
        baseURL: config.baseURL // 커스텀 훅 사용 시 제공된 baseURL 사용
    });

    // 요청 및 응답 인터셉터 설정
    axiosInstance.interceptors.request.use(config => {
        // 요청 로깅 또는 수정
        console.log("Sending request to:", config.url);
        return config;
    }, error => {
        // 요청 오류 처리
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(response => {
        // 응답 로깅 또는 수정
        console.log("Received response from:", response.config.url);
        return response;
    }, error => {
        // 응답 오류 처리
        return Promise.reject(error);
    });

    // 컴포넌트 언마운트 시 요청 취소
    useEffect(() => {
        const source = axios.CancelToken.source();
        return () => source.cancel("Component unmounted: Request cancelled.");
    }, []);

    // API 호출 함수
    const fetchData = async (requestConfig) => {
        setLoading(true);
        try {
            const result = await axiosInstance(requestConfig);
            setResponse(result.data);
        } catch (error) {
            if (axios.isCancel(error)) console.log("Request cancelled", error.message);
            else setError(error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
}