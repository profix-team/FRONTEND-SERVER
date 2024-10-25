// Vue의 <script setup>과 비슷한 역할을 하는 import 구문
import { useState } from 'react';

// Vue의 <template> 영역에 해당하는 부분이 함수의 return 값으로 들어갑니다
function App() {
    // const [변수, 변경함수] = useState(초기값)
    // Vue의 data() { return { count: 0 } } 와 비슷한 역할
    const [count, setCount] = useState(0);
    const [name, setName] = useState('홍길동');
    const [isVisible, setIsVisible] = useState(true);

    // Vue의 methods와 비슷한 역할
    const increaseCount = () => {
        setCount(count + 1);
    };

    // Vue의 template 영역을 대체
    return (
        <div>
            <p>카운트: {count}</p>
            <p>이름: {name}</p>
            <button onClick={increaseCount}>count is {count}</button>
            <button onClick={() => setName('이순신')}>이름은 {name}</button>
            <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? '숨기기' : '보이기'}</button>
        </div>
    );
}

export default App;