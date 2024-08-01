import { Link } from "react-router-dom";
import { useLogto } from '@logto/react';

const LoginNOutButton = () => {
  const { signIn, signOut, isAuthenticated  } = useLogto();

  return isAuthenticated ? (
    <button onClick={() => signOut(import.meta.env.VITE_HOST_URI)}>Sign Out</button>
  ) : (
    <button onClick={() => signIn(import.meta.env.VITE_HOST_REDIRECT_URI)}>Sign In</button>
  );
};

const ViewKeysButton = () => {
  const { isAuthenticated } = useLogto();

  return isAuthenticated ? (
    <button
      onClick={() => {
        window.location.href = "/view";
      }}
    >
      View Keys
    </button>
  ) : null;
}

function Home() {
  return (
    <div className="app-home">
      <div className="app-container">
        <img src="/chain.png" alt="App Logo" height={120} />
        <h1>URL KV Store App</h1>
        <p>Controls https://s.b68.dev</p>

        <Link to={"https://github.com/BRAVO68WEB/url-store-kv-app.git"}>Github Repo</Link>
        <br />
        <br />

        <ViewKeysButton />
        <LoginNOutButton />
      </div>
    </div>
  )
}

export default Home
