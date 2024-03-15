import React from 'react';
import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";

export default function Singin(props) {
    return (
      <>
      <GlobalStyle />
      <SinginPage>
      <div style={{fontSize: '40px', color: '#25CCF0'}}>7FEB</div>
        <Inputbox>
          <input placeholder="아이디" />
          <input placeholder="비밀번호"/>
          <input placeholder="비밀번호 확인"/>
        </Inputbox>
        <Inputbox>
          <input placeholder="상호명"/>
          <input placeholder="가맹점 번호"/>
          <input placeholder="휴대폰 번호"/>
          <input placeholder="이메일주소"/>
        </Inputbox>
        <Clauses>
          [필수] 인증 약관 전체 동의
          <Checkbox type="checkbox" />
        </Clauses>
        <Button>인증 요청</Button>
      </SinginPage>

      </>
    );
}

const SinginPage = styled.div`
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
        border-radius: 10px;
        border-color: #25CCF0;
        padding: 10px;
        font-size: 16px;
    }

    input:last-child {
        margin-bottom: 20; /* Password input에는 아래쪽 마진을 없애줌 */
    }
`

const Clauses = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  width: 80%;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  border-color: #25CCF0;
  padding: 10px;
  font-size: 16px;
  text-align: left;
`
const Checkbox = styled.input`
  margin-left: 10px;
`;
const Button = styled.button`
    margin-top: 30px;
    width: 85%;
    border-radius: 10px;
    background-color: #25CCF0;
    padding: 10px;
    font-size: 16px;
    border: none;
`
;