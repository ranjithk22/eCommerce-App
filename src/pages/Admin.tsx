import { useEffect, useRef, useState } from "react"
import Navbar from "../components/Navbar"
import supabase from "../config/supabase";
import ProfilePic from "../components/ProfilePic";


const Admin = () => {
    const [userId, setUserId] = useState('');
    const [updateStatus, setUpdateStatus] = useState(false)
    const [path, setPath] = useState<string>('')
    const profilePicRef = useRef<HTMLInputElement>(null)

    let url = import.meta.env.VITE_SUPABASE_URL

    const getUser = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user !== null) {
                setUserId(user.id);
            }
        } catch (e) {
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        setPath(`${url}/storage/v1/object/public/profile//${userId}/profile-pic`)
    }, [userId])


    const uploadImage = async () => {
        let selectedImage = profilePicRef.current?.files?.[0]
        if (!selectedImage) {
            alert('Please select an image.');
            return;
        }

        if (selectedImage && userId) {
            try {
                const [response1, response2] = await Promise.all([
                    supabase.storage.from('profile').remove([`${userId}/profile-pic`]),
                    supabase.storage.from('profile').upload(userId + '/profile-pic', selectedImage)
                ])
                console.log(response1.data, response2.data)

                if (response1.error || response2.error) {
                    console.log(response1.error);
                    console.log(response2.error);
                } else {
                    setPath(`${url}/storage/v1/object/public/profile//${userId}/profile-pic`)
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container pt-5">
                Admin Page

                <p>Profile Pic</p>
                <div className="flex border-1 p-2 items-center">
                    {path.length > 0 && <ProfilePic filePath={path} />}
                    <input type="file" ref={profilePicRef} accept="image/*" />
                    <button className="btn-sm" onClick={uploadImage}>upload</button>
                </div>

                Uploaded Image:
            </div>
        </div>
    )
}

export default Admin