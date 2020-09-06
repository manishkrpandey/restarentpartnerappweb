import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import './Login.css'
import {FakeAuth} from '../../Service'
import { useSelector , useDispatch } from "react-redux";
import {addUserInfo} from '../../Store/action/Action'
function Login(props){
    const userData = useSelector(state => state.reducer.userInfo)
    const [input, setInput] = useState('')
    const [error , setError] = useState(false)
    const history = useHistory()
    async function fetchLogin(){
        let login = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        login.json().then((data) =>{
            localStorage.setItem("login" , input)
            const checkAuth = FakeAuth.authenticate()
            if(checkAuth){
                history.push('/home')
            }else{
                history.push('/')
            }
        },(error)=>{
            console.log(error , 'data login')
        })
    }
    const chackAuth = (data) => {
        let mRegex = /^[6789]\d{9}$/
        let validMobileNumber = mRegex.test(data);
        setInput(data)
        if(validMobileNumber){
            setError(false)
            fetchLogin()
        }else{
            setError(true)
        }
    }
    return(
        <div className="card loginBox">
            <div className="card-body loginCard">
                <h2>Login</h2>
                <div className="form-group mt-3">
                    <input value={input} type={'number'} onChange={e => chackAuth(e.target.value)} className="form-control" placeholder="contact number..." type="number" />
                    {error?(<span className="showError">Add Vali Number</span>):('')}
                </div>
                <div className="form-group">
                    <button onClick={chackAuth} className="btn btn-primary btn-block">Enater Mobile Number</button>
                </div>
            </div>
        </div>
    )
}
export default Login