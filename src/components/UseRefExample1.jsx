import { useState, useRef } from 'react';

// useRef의 주요 특징 1. 컴포넌트가 다시 렌더링되지 않음

// State 증가 버튼을 클릭하면:
// stateCount가 변경됨
// 컴포넌트가 다시 리렌더링됨
// console.log('컴포넌트가 렌더링됨!') 출력됨
// 화면이 업데이트됨

// Ref 증가 버튼을 클릭하면:
// refCount.current가 변경됨
// 컴포넌트가 다시 렌더링되지 않음
// 콘솔에서만 값 변경을 확인할 수 있음
// 화면은 업데이트되지 않음

function UseRefExample1() {
    const [stateCount, setStateCount] = useState(0); // useState (데이터)
    const refCount = useRef(0); // useRef (DOM 조작)
    const inputRef = useRef(null); // useRef (DOM 조작)
    const focusInput = () => {
        // Vue의 $refs와 비슷
        inputRef.current.focus();
    };

    console.log('컴포넌트가 렌더링됨');

    const handleStateClick = () => {
        setStateCount(stateCount + 1);
    };

    const handleRefClick = () => {
        refCount.current += 1;
        console.log('현재 refCount: ', refCount.current);
    };

    return (
        <div>
            <input ref={inputRef} type="text" />
            <p> State 값: {stateCount}</p>
            <p> Ref 값: {refCount.current}</p>
            <button onClick={handleStateClick}>State 증가</button>
            <button onClick={handleRefClick}>Ref 증가</button>
        </div>
    );
}

export default UseRefExample1;
