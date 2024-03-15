import React from 'react';
import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";

export default function Login(props) {
    return (
        <>
        <GlobalStyle />
        <LoginPage>
            <div style={{fontSize: '40px', color: '#25CCF0'}}>7FEB</div>
            <Inputbox>
                <input placeholder="ID" />
                <input placeholder="Password"/>
            </Inputbox>

            <div style={{fontSize: '40px', margin: '20px'}}>로그인</div>
            <div style={{fontSize: '20px', margin: '50px'}}>회원가입 비밀번호찾기</div>
        </LoginPage>
        </>
    );
}

const LoginPage = styled.div`
    max-width: 400px;
    height: 600px;
    width: 100%;
    margin: auto;
    margin-top: 150px;
    border-style: solid;
    border-color: #25CCF0;
    padding: 20px;
    text-align: center;
`

const Inputbox = styled.div`
    margin-top: 50px;

    input {
        width: 80%; /* 조정 가능한 폭 */
        border-style: solid;
        border-width: 1px;
        border-color: #25CCF0;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 40px; /* 아래쪽 간격 추가 */
    }

    input:last-child {
        margin-bottom: 0; /* Password input에는 아래쪽 마진을 없애줌 */
    }
`;