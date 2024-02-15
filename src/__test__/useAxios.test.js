import { renderHook, act } from '@testing-library/react-hooks';
import useAxios from '../hooks/useAxios';
import axios from "axios";

import MockAdapter from 'axios-mock-adapter';

// axios 인스턴스에 대한 모의 설정
const mock = new MockAdapter(axios);

describe('useAxios custom hook', () => {
    it('요청한 데이터를 성공적으로 가져와야 합니다.', async () => {
        const mockData = { data: 'some data' };
        mock.onGet('https://jsonplaceholder.typicode.com/posts').reply(200, mockData);

        const { result, waitForNextUpdate } = renderHook(() => useAxios({
            axiosInstance: axios,
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }));

        await waitForNextUpdate();

        expect(result.current[0]).toEqual(mockData); // response
        expect(result.current[1]).toBe(""); // error
        expect(result.current[2]).toBe(false); // loading
    });

    it('HTTP 에러를 적절히 처리해야 합니다.', async () => {
        mock.onGet('https://jsonplaceholder.typicode.com/posts').networkError();

        const { result, waitForNextUpdate } = renderHook(() => useAxios({
            axiosInstance: axios,
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }));

        await waitForNextUpdate();

        expect(result.current[1]).not.toBe(""); // error
        expect(result.current[2]).toBe(false); // loading
    });

    it('refetch를 호출하면 요청이 다시 발생해야 합니다.', async () => {
        const mockDataFirst = { data: 'first data' };
        const mockDataSecond = { data: 'second data' };
        mock.onGet('https://jsonplaceholder.typicode.com/posts')
            .replyOnce(200, mockDataFirst)
            .onGet('https://jsonplaceholder.typicode.com/posts')
            .replyOnce(200, mockDataSecond);

        const { result, waitForNextUpdate, rerender } = renderHook(() => useAxios({
            axiosInstance: axios,
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts'
        }));

        await waitForNextUpdate();

        // 첫 번째 요청 후의 응답
        expect(result.current[0]).toEqual(mockDataFirst);

        // refetch 호출
        act(() => {
            result.current[3]();
        });

        await waitForNextUpdate();

        // refetch 후 응답
        expect(result.current[0]).toEqual(mockDataSecond);
    });
});