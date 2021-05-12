import jwtDecode from "jwt-decode";

export const decodedToken = () => {
    try {
        const token = localStorage.getItem('token')

        const decodedInfo = jwtDecode(token)

        return decodedInfo
    } catch (error) {
        return null
    }
}