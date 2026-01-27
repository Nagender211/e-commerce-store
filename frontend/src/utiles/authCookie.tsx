import api from "./api"

export const CookieUser = async()=>{
    try {
        const user=await api.get('/me')
        console.log(user.data)
        return user.data.data
    } catch (error) {
        console.log("while error getting your data",error)
    }

}