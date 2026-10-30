import logo from './logo.svg';
import './App.css';
import { DiAtom } from 'react-icons/di';

import List from './List/List';

function App() {
    return (
        <div className="App">
            <header className='flex justify-between items-center text-xl font-bold h-20 p-10 bg-slate-200'>
                {/* <p>1</p> */}
            </header>
            <main>
                <List />
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default App;
