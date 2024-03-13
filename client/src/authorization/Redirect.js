
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL || '';
axios.defaults.withCredentials = true; 

const Redirect = (props) => {
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
            } else {
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
                console.log('approved')
                // navigate('/select');
            } else {
                setRedirect(true);
                
            }
        } catch (error) {
            setRedirect(true);
        }
    }
    return redirect ? props.children : <>Authorized</>;
}

export default Redirect;

