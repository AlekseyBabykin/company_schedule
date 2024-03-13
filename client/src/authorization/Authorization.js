import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL || '';
axios.defaults.withCredentials = true;  

const Authorization = (props) => {
    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);

    
    useEffect(() => {
        getToken();
    }, []);

    
    const getToken = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/user/token`, {
                withCredentials:true,

            });
            if (res.status === 200) {
                console.log ('from get token',res.data);
                verify(res.data)
            } 
        } catch (error) {
            console.log('error from get token',error)
        }
    }

    
    const verify = async (tokenToVerify) => {
        
        try {
            const res = await axios.get(`${baseURL}/api/user/auth`, {
                headers: {
                    "x-access-token": tokenToVerify,
                    'Access-Control-Allow-Origin': '*', 
                },
                withCredentials:true,

            });
            if (res.status === 200) {
                setRedirect(true);
            } else {
                // navigate('/'); 
            }
        } catch (error) {
            // navigate('/');
        }
    }
    return redirect ? props.children : <>Not authorized</>;
}

export default Authorization;

