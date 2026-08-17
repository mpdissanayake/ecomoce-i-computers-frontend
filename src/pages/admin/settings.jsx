import { useEffect, useState } from "react"

import api from "../utils/api";
import LoadingAnimation from "../../components/lodingAnimation";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage(){
    const [user,setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    

    useEffect(
        ()=>{
            const token = localStorage.getItem("token")

            if(token){
                api.get("/users/me", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data)
                    setUser(response.data);
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                }
                )
                .catch(error=>{
                    console.log(error)

                })
            }
        }
    ,[]);
    async function updateProfile(){
        setIsUpdatingProfile(true);  // ✅ Start loading
        const token = localStorage.getItem("token");
        let image = user.image;

        try{

        if(imageFile){
            image = await uploadMedia(imageFile);
                  
        }
        const response = await api.put("/users/", {
            firstName :firstName,
            lastName : lastName,
            image : image },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.setItem("token", response.data.token)

            toast.success("profile Updated Successfuly")

            // ✅ User Data එක Update කරන්න
            setUser(response.data.user);
            setFirstName(response.data.user.firstName);
            setLastName(response.data.user.lastName); 
            
           // window.location.reload();

        }catch(error){
            console.log(error)
            toast.error("failed to uplord image")
            setIsUpdatingProfile (false)
            return;
        
    }
}

async function updatePassword() {
    setIsUpdatingPassword(true)
    if(password !== confirmPassword){
        toast.error("Password do not match")
        return;
    }
    const token = localStorage.getItem("token");

    try{
        await api.put("/users/password",{
        newPassword :password
    } , {
        headers : {
            Authorization: `Bearer ${token}`
        }
    })
    toast.success("Password updated successfully")
    setPassword("")
    setConfirmPassword("");
    //window.location = "/login"
    window.location.href = "/login"

    }catch(error){
        console.log(error)
        toast.error("Failed to Update Pasword")
        

    }
    setIsUpdatingPassword(false)
    
}

    return(
        <div className="w-full h-screen flex items-center justify-center gap-6">
            {
                user? (
                <>
                <div className="w-[400px] h-[400px] bg-white shadow-lg p-6 ">
                    <h1 className=" text-2xl font-bold mb-4">Basic Information </h1>
                    <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter first name"
                            />
                        </div>
                   
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Last Name</label>
                        <input 
                        value={lastName}
                        onChange={(e)=> setLastName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"                        
                        />
                    </div>
                     <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Profile Image</label>
                        <input 
                        type="file"
                        onChange={(e)=> setImageFile(e.target.files[0])}
                        className="w-full p-2 border border-gray-300 rounded"                        
                        />
                    </div>
                    <button 
                    onClick={updateProfile} className="px-4 py-2 bg-accent text-white rounded"disabled={isUpdatingProfile} >{isUpdatingProfile ? "Updating..." : "Update Profile"}
                    </button>
                </div>
                <div className="w-[400px] h-[400px] bg-white shadow-lg p-6 relative">
                    <h1 className=" text-2xl font-bold mb-4">Change Password</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Password</label>
                        <input 
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"                        
                        />    
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"                        
                        /> 
                    </div>
                    <button onClick={updatePassword} disabled={isUpdatingPassword} className="px-4 py-2 absolute bottom-6 bg-accent text-white rounded">
                        {isUpdatingPassword? "Updating ......" : "Update Password"}
                    </button>

                </div>
                </>
                ):(
                <LoadingAnimation/>
            )}
            

        </div>
    )
}