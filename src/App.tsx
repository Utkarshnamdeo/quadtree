import { Header, Tree } from '@/components/';

function App() {
  return (
    <div className='bg-white h-screen'>
      <header>
        <Header />
      </header>
      <main className='h-[calc(100%-56px)] lg:h-[calc(100%-64px)]'>
        <Tree />
      </main>
    </div>
  );
}

export default App;
