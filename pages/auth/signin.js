import Header from "../../components/Header";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {db} from "../../firebase";




export default function Signin() {
    function onGoogleClick() {
        
        // console.log("rere");
        try {
          const auth = getAuth();
          const provider= new GoogleAuthProvider();
           signInWithPopup(auth,provider);
           const user = auth.currentUser.providerData[0]

          console.log(user);
      } catch (error) {}
    }

  return (
    <div>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          src="https://superviral.com.au/wp-content/uploads/2021/08/instagix-banner-graphic.png"
          alt="instagram-image"
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
        />
        <div>
            <div   className="flex flex-col items-center">
                <img
                className="w-32 object-cover"
                src="https://socodigital.com/wp-content/uploads/2021/03/Instagram.png"
                alt="popopo"
                />
                <p className="text-sm italic my-10 text-center">this app is created for learning purpose </p>
                 <button  onClick={onGoogleClick} className="bg-red-400 rounde-lg p-3 text-white hover:bg-red-500">
                    sign in with google
                </button> 
            </div>
        </div>
      </div>

    </div>
  );
}











