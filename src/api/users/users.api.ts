import { axiosAnonInstance } from "../axiosIntances";

export default{
    getUsers:(queryString:string)=>axiosAnonInstance.get(`/api/Users${queryString??""}`),
    createUsers:(body:any)=>axiosAnonInstance.post(`/api/Users/`,body),
    getUserById:(id:string)=>axiosAnonInstance.get(`/api/Users/${id}`),
    updateUsers:(req:any)=>axiosAnonInstance.put(`/api/Users/${req.id}`,req.body),
    deleteUsers:(id:string)=>axiosAnonInstance.delete(`/api/Users/${id}`),
}
