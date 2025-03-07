
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';




const Login = ({ setIsAuth }) => {


    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("isAuth", true);
                setIsAuth(true);
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
            
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl text-center">
          <h2 className="text-4xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Sign in with Google</h2>
          
          <button
            onClick={signInWithGoogle}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out shadow-md"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
};

export default Login;