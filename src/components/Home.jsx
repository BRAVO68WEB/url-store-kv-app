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
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
        
        <ViewKeysButton />
        <LoginNOutButton />
      </div>
    </div>
  )
}

export default Home
