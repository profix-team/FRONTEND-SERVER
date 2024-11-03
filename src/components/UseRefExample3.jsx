import { useState, useRef, useEffect } from 'react';

// useRef의 실제 활용 -> State 변경되어 리렌더링 되는걸 활용한 예제
// ref 값은 리렌더링 사이에도 계속 유지됨

function UseRefExample3() {
    const [렌더, set렌더] = useState(0);
    const 마지막스크롤위치 = useRef(0);

    useEffect(() => {
        const 스크롤움직임 = () => {
            마지막스크롤위치.current = window.scrollY;
            if (window.scrollY % 100 === 0) {
                // 스크롤이 100씩 움직일 때마다 리렌더링
                set렌더((r) => r + 1); // 직접 set렌더(렌더 + 1)과 같이 변수를 업데이트해도 되나, 함수형 업데이트를 사용하는게 좋음. (변수 이름은 아무거나 해도 ㅇㅋ)
                // 리렌더링 하기 위해 스크롤 이벤트 사용함
            }
        };

        window.addEventListener('scroll', 스크롤움직임);
        return () => window.removeEventListener('scroll', 스크롤움직임); // 컴포넌트가 사라질 때(언마운트될 때) 이벤트 제거
    }, []);

    return (
        <div style={{ height: '200vh' }}>
            <p>마지막 스크롤 위치: {마지막스크롤위치.current}</p>
            <p>리렌더링 횟수: {렌더}</p>
        </div>
    );
}

export default UseRefExample3;
