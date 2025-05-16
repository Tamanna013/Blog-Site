import Login from './components/account/Login'
import DataProvider from './context/DataProvider';
export default function Home() {
  return (
    <>
      <DataProvider>
        <Login />
      </DataProvider>
    </>
  );
}
