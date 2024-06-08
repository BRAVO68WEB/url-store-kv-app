import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LoginNOutButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <button onClick={() => logout()}>Log Out</button>
  ) : (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  );
};

const ViewKeysButton = () => {
  const { isAuthenticated } = useAuth0();

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
