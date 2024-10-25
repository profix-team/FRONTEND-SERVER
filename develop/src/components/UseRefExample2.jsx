import { useState, useRef } from 'react';

// useRef의 주요 특징 2. 렌더링 사이에도 값이 유지됨

function UseRefExample2() {
    const [stateCount, setStateCount] = useState(0); // useState (데이터)
    const refCount = useRef(0); // useRef (DOM 조작)
    let normalVariable = 0; // 일반 변수

    const handleStateClick = () => {
        setStateCount(stateCount + 1); // state 변경으로 리렌더링 발생
    };

    console.log('일반 변수: ', normalVariable);
    console.log('ref 변수: ', refCount.current);
    // normalVariable은 컴포넌트가 리렌더링될 때마다 다시 0으로 초기화됨
    // refVariable.current는 리렌더링되어도 이전 값을 유지함

    return (
        <div>
            <p> 렌더링 횟수: {stateCount}</p>
            <button
                onClick={() => {
                    normalVariable += 1;
                    refCount.current += 1;
                    handleStateClick(); // handleClick()는 리렌더링을 발생시키기 위해 들어감. (리액트는 handleStateClick())
                }}
            >
                클릭
            </button>
        </div>
    );
}

export default UseRefExample2;
