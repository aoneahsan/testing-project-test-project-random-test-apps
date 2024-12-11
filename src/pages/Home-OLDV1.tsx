import { atom, useRecoilState } from 'recoil';

const counterRStateAtom = atom({
	key: 'adadasd',
	default: {
		counter: 0,
	},
});

const HomeOldV1 = () => {
	const [counterRState, setCounterRState] = useRecoilState(counterRStateAtom);
	return (
		<>
			<h1>home page</h1>
			<p>Counter: {counterRState.counter}</p>
			<button
				onClick={() => {
					setCounterRState((oldState) => ({
						...oldState,
						counter: +oldState.counter,
					}));
				}}
			>
				Add
			</button>
			<button
				onClick={() => {
					setCounterRState((oldState) => ({
						...oldState,
						counter: -oldState.counter,
					}));
				}}
			>
				Remove
			</button>
			<button
				onClick={() => {
					setCounterRState((oldState) => ({
						...oldState,
						counter: 0,
					}));
				}}
			>
				Reset
			</button>
			<button
				onClick={() => {
					setCounterRState((oldState) => ({
						...oldState,
						counter: Math.round(Math.random() * 100000000),
					}));
				}}
			>
				Random
			</button>
		</>
	);
};

export default HomeOldV1;
