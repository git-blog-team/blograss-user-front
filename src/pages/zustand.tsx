import { useStore } from '@/store/bears';

function BearCounter() {
    const bears = useStore((state) => state.bears);
    return <h1>{bears} around here...</h1>;
}

function Controls() {
    const increasePopulation = useStore((state) => state.increasePopulation);
    return <button onClick={increasePopulation}>one up</button>;
}

export default function Zustand() {
    return (
        <>
            <BearCounter />
            <Controls />
        </>
    );
}
