import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { doc, setDoc } from "firebase/firestore";

import {
  db,
  auth,
  signInWithPopup,
  googleProvider,
  githubProvider,
} from "/firebase";

function Login() {
  const { setUser } = useContext(UserContext);

  function createUser(serviceProvider) {
    signInWithPopup(auth, serviceProvider).then((result) => {
      const userData = {
        name: result.user.displayName,
        image: result.user.photoURL,
        uid: result.user.uid,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setDoc(doc(db, "users", userData.uid), userData, { merge: true });
    });
  }

  const style = {
    loginContainer:
      "flex items-center justify-center h-screen lg:justify-evenly mx-5",
    innerContainer: "text-center",
    heading: "text-4xl font-semibold lg:min-w-[200px] lg:text-5xl",
    subHeading: "pt-3 lg:text-xl",
    buttonImage: "mr-3 w-[30px]",
    googleButton:
      "text-white bg-primaryBlue hover:bg-accentBlue focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg font-semibold px-5 py-2.5 items-center inline-flex justify-center mb-2 w-full mt-10",
    githubButton:
      "text-white bg-primaryBlue hover:bg-accentBlue focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg font-semibold px-5 py-2.5 items-center inline-flex justify-center mb-2 w-full mt-3",
    loginArt: "hidden lg:block max-w-[500px]",
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.innerContainer}>
        <h1 className={style.heading}>Shiftwork Buddy</h1>
        <p className={style.subHeading}>Your shiftwork assistant.</p>

        <div>
          <button
            type='button'
            className={style.googleButton}
            onClick={() => createUser(googleProvider)}
          >
            <img
              src='/icons/google-icon.svg'
              alt='google icon'
              className={style.buttonImage}
            />
            <span>Login with Google</span>
          </button>

          <button
            type='button'
            className={style.githubButton}
            onClick={() => createUser(githubProvider)}
          >
            <img
              src='/icons/github-icon.svg'
              alt='google icon'
              className={style.buttonImage}
            />
            <span>Login with Github</span>
          </button>
        </div>
      </div>

      <div className={style.loginArt}>
        <img src='/login-art.svg' alt='login art' />
      </div>
    </div>
  );
}

export default Login;
