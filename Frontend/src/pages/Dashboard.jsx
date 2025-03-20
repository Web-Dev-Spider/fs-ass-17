import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios/axiosInstance'
import { Navigate, useNavigate } from 'react-router-dom'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState("user")
    const [email, setEmail] = useState("email")

    const navigate = useNavigate()

    const capitalize = (word) => {
        return word
            .split(' ')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    };


    useEffect(() => {

        const getUser = async () => {
            try {
                const token = localStorage.getItem('token')
                console.log('token received at dashboard.jsx', token)
                console.log('Getting user in the useEffect() at getUsser')
                const response = await axiosInstance.get('/users/dashboard', {
                    withCredentials: true
                })
                setIsLoading(false)
                console.log('response received at getuser axios', response.data.user)

                setEmail(response.data.user.email)
                setUser(response.data.user.name)
                console.log(user)

            } catch (error) {
                console.log("Error at getUser function()", error.message)

                navigate('/login')
            }

        }
        getUser()
    }, [navigate])
    return (
        <div>
            {isLoading ? <div className='flex items-center justify-center'><AiOutlineLoading3Quarters /></div> : <div className='container items-start mx-auto md:ml-5 py-0 md:mt-6'>
                <h1 className='text-4xl font-light text-amber-900'>Welcome <span className='pr-2 font-semibold'>{capitalize(user)}</span></h1>
                <h3 className='text-6xl mt-5 font-light'>See the wide varieties of fakes, that you won't find anywhere else in this world...</h3>
                <h4 className='text-4xl font-bold mt-8 text-slate-700 text-center'>TRUELY FAKE... THAT YOU NEVER CAN'T IDENTIFY</h4>

                <p className='flex items-center justify-center'>We will contact you at {email} SOON....</p>
            </div>}
        </div>

    )
}

export default Dashboard





// import React, { useEffect, useState } from 'react'

// function Dashboard() {
//     const [welcomeMessage, setWelcomeMessage] = useState("")

//     // const capitalize = (sentence) => {
//     //     return sentence.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
//     // }
//     useEffect(() => {
//         console.log('Use effect is working now.. at welcome page')
//         const token = localStorage.getItem('token')
//         console.log(token)
//         setWelcomeMessage("Hello")
//         // if (userName) {
//         //     setWelcomeMessage(`${capitalize(userName)},`)
//         // }

//         // console.log('username received in the welcome page from the cookie', userName)
//     }, [welcomeMessage])
//     console.log("Hello I am in the welcome page")
//     return (
//         <div className='container items-start mx-auto md:ml-5 py-0 md:mt-6'>
//             <h1 className='text-4xl font-light text-amber-900'>Welcome <span className='pr-2 font-semibold'>asdfsdf</span></h1>
//             <h3 className='text-6xl mt-5 font-light'>See the wide varieties of fakes, that you won't find anywhere else in this world...</h3>
//             <h4 className='text-4xl font-bold mt-8 text-slate-700 text-center'>TRUELY FAKE... THAT YOU NEVER CAN'T IDENTIFY</h4>
//         </div>
//     )
// }

// export default Dashboard
