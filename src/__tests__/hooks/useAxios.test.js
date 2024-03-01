import { renderHook, act } from '@testing-library/react';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';

// Axios 모의를 위한 jest.mock() 설정
jest.mock('axios');

describe('useAxios 커스텀 훅', () => {
    it('성공적인 요청 처리', async () => {
        const mockData = { data: 'some data' };
        axios.create.mockReturnThis(); // axios.create() 호출을 현재 axios 객체로 모의 설정
        axios.request.mockResolvedValue(mockData); // axios.request() 호출을 성공적인 응답으로 모의 설정

        const { result, waitForNextUpdate } = renderHook(() => useAxios({
            baseURL: 'https://jsonplaceholder.typicode.com/posts',
        }));

        act(() => {
            result.current.fetchData({ url: 'https://jsonplaceholder.typicode.com/posts', method: 'get' });
        });

        await waitForNextUpdate();

        expect(result.current.response).toEqual(mockData);
        expect(result.current.error).toBe("");
        expect(result.current.loading).toBe(false);
    });
});