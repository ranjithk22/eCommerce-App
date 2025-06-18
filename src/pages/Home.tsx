import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import type { RootState } from "../store/Store"
import supabase from "../config/supabase"
import { Link } from "react-router-dom"

interface ProfileTypes {
    customerId: string,
    customerName: string,
    profilePic: string,
    designation: string,
}
interface currentUserTypes {
    currentUser: string
}
const Home = ({ currentUser }: currentUserTypes) => {
    const [profile, setProfile] = useState<ProfileTypes>({
        customerId: '',
        customerName: '',
        profilePic: 'https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
        designation: '',
    })
    const { userId } = useSelector((state: RootState) => state.userData.user)

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const { data, error } = await supabase.from('profiles').select('*').eq('customer_id', userId)
    //             if (data !== null) {
    //                 setProfile((prev: ProfileTypes) => ({ ...prev, customerName: data[0].name, profilePic: data[0].profile_pic, designation: data[0].designation, }))
    //             }
    //             if (error) {
    //                 console.log(error);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })()
    // }, [userId])
    console.log(currentUser)
    return (
        <div>
            <Navbar />
            {currentUser === 'admin@test.com' && <Link to="/admin">Admin Page</Link>}
            <div className="container pt-5">
                <h3>Profile</h3>
                {profile.customerName && (
                    <>
                        <p>{profile.customerName}</p>
                        <p>{profile.designation}</p>
                        <img src={profile.profilePic} alt="" />
                    </>
                )}
            </div>
        </div>
    )
}

export default Home