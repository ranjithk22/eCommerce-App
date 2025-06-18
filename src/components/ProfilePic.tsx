
interface ProfilePicTypes {
    filePath: string
}
const ProfilePic = ({ filePath }: ProfilePicTypes) => {
    return (

        <img className="w-[100px] pr-5" src={filePath} />
    )
}

export default ProfilePic