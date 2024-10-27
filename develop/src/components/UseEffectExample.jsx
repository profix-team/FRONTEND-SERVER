// 보통 실무에서 많이 쓰는 시나리오
// useEffect는 아래의 상황에 많이 쓰임
// API 호출
// 이벤트 리스너
// 데이터 불러오기

function UseEffectExample() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true); // 로딩 중

	useEffect(() => {
		const fetchUsers = async function() {
			try {
				const response = await fetch('/api/users');
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false); // api 요청 관계 여부와 상관 없이 로딩 상태 해제
			}
		}

		fetchUsers();
	}, []);

	if (loading) { // v-if와 비슷한 역할
		return <div> Loading ... </div>
	}

	return (
		<ul>
			{users.map(user => ( // v-for과 비슷한 역할
				<li key={user.id}>{user.name}</li>
			))}
		</ul>
	)
}