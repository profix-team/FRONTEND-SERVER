import { useRef, useEffect, useState } from 'react';
import UseRefExample1 from './components/useRefExample1';
import UseRefExample2 from './components/UseRefExample2';
import UseRefExample3 from './components/UseRefExample3';

function Study() {
    // const [변수, 변경함수] = useState(초기값)
    // Vue의 data() { return { count: 0 } } 와 비슷한 역할
    const [count, setCount] = useState(0);
    const [name, setName] = useState('홍길동');
    const [isVisible, setIsVisible] = useState(true);

    // --------------------------------------------------------------------------------

    // DOM 조작이란?
    // DOM(Document Object Model)은 웹 페이지의 요소들을 의미합니다. DOM 조작은 이러한 요소들을 직접 제어하는 것을 말함
    // input에 포커스 주기
    // 비디오 재생/정지
    // 스크롤 위치 조정
    // 요소의 크기나 위치 가져오기

    // useRef의 주요 특징:
    // 1. .current로 값에 접근/수정
    // 2. 값이 변경되어도 컴포넌트가 다시 렌더링되지 않음
    // 3. 렌더링 사이에도 값이 유지됨

    // useRef는 이런 상황에서 유용함:
    // 렌더링과 무관한 값 저장 (타이머 ID, 이벤트 리스너 등)
    // 성능 최적화 (불필요한 리렌더링 방지)
    // 이전 값들의 히스토리 보관
    // DOM 요소의 참조 저장

    // --------------------------------------------------------------------------------

    // useEffect(() => {
    //     실행할 코드
    //     return () => {
    //         클린업 코드 (컴포넌트 제거 전이나 다음 effect 실행 전에 실행됨)
    //     };
    // }, [의존성배열]); // 이 배열의 값들이 변경될 때만 effect 실행

    // 1. mounted (컴포넌트가 마운트될 때)
    useEffect(() => {
        console.log('컴포넌트가 마운트됨(Vue의 mounted)');

        // 2. destroyed (컴포넌트가 언마운트될 때)
        return () => {
            console.log('컴포넌트가 언마운트됨(Vue의 destroyed)');
        };
    }, []); // 빈 배열: 마운트/언마운트시에만 실행;

    // 3. updated (특정 변수가 변경될 때)
    useEffect(() => {
        console.log('특정 변수가 변경됨(Vue의 updated)');
    }, [count]); // data 변수가 변경될 때만 실행

    // 4. 모든 상태 변경 시 실행 (의존성 배열 생략)
    useEffect(() => {
        console.log('어떤 상태라도 변경되면 실행');
    });

    // 	created →   컴포넌트 함수 자체 또는 useEffect
    //  mounted →   useEffect + 빈 의존성 배열
    //  updated →   useEffect + 의존성 배열에 감시할 값 추가
    // 	destroyed → useEffect의 cleanup 함수

    // --------------------------------------------------------------------------------

    // Vue의 methods와 비슷한 역할
    const increaseCount = () => {
        setCount(count + 1);
    };

    // ❌ 잘못된 방법들
    // const wrongWay1 = () => {
    //     count = count + 1; // 직접 수정 불가능
    //	   count++; // 직접 수정 불가능
    // };

    // --------------------------------------------------------------------------------

    return (
        <div>
            <p>카운트: {count}</p>
            <p>이름: {name}</p>
            <button onClick={increaseCount}>count is {count}</button>
            <button onClick={() => setName('이순신')}>이름은 {name}</button>
            <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? '숨기기' : '보이기'}</button>
            <UseRefExample1 />
            <UseRefExample2 />
            <UseRefExample3 />
        </div>
    );
}

export default Study;
