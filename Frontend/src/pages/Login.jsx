import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios/axiosInstance'

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")
    const navigate = useNavigate()


    const handleInputChange = (event) => {
        setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))

        // console.log(event.target.name, event.target.value)
    }

    const handleLoginSubmit = async (event) => {

        try {
            event.preventDefault()
            if (!validateFormData()) return

            console.log("The form data for login", formData)
            const response = await axiosInstance.post('/auth/sign-in', formData, { withCredentials: true })
            setFormData({ email: "", password: "" })
            console.log('Response received at sign-in: \n',
                response.data.message
            )
            // const { name } = response.data.data.user
            // console.log(response.data.message)
            console.log("Token received from backend", response.data.token)
            localStorage.setItem('token', response.data.token)

            //working okey.. token is stored and can be retried from browser...
            // const tok = localStorage.getItem('token')
            // console.log('token retrived from browser', tok)
            setMessage(response.data.message)

            navigate('/dashboard')

        } catch (error) {
            setErrors(error)
            console.log(error)
        }
    }

    function validateFormData() {
        let formDataErrors = {}
        if (!formData.email.trim()) {
            formDataErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            formDataErrors.email = 'Invalid email format'
        }

        if (!formData.password) {
            formDataErrors.password = 'Password is required'
        }

        setErrors(formDataErrors)
        console.log("Errors set by validation function in login page", errors)
        console.log("True or falise", Object.keys(formDataErrors).length === 0)

        return Object.keys(formDataErrors).length === 0

    }
    return (
        <div className='h-full flex flex-1 items-center justify-center'>
            <form className='container flex justify-center items-center' onSubmit={handleLoginSubmit} noValidate>
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-8 rounded-box">
                    <legend className="fieldset-legend text-xl">Login</legend>

                    <div className='relative'>
                        <label className="fieldset-label mt-2">Email</label>
                        <input type="email" className="input " placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} onFocus={() => setErrors((prev) => ({ ...prev, email: " " }))} />
                        <p className="text-red-500 text-xs min-h-[0.3rem] absolute left-0 top-full  ml-3">{errors.email || " "}</p>
                    </div>
                    <div className='w-full relative'>
                        <label className="fieldset-label mt-2">Password</label>
                        <input type="password" className="input" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} onFocus={() => setErrors((prev) => ({ ...prev, password: " " }))} />
                        <p className="text-red-500 text-xs min-h-[0.3rem] absolute top-full left-0 ml-3">{errors.password || " "}</p>
                    </div>

                    <button className="btn btn-neutral mt-4" type='submit' >Login</button>

                    <p className='fle flex-col md:flex-row text-sm font-medium text-gray-700'>Don't have an account? <span className='text-blue-500 md:ml-2 hover:text-green-900'><Link to='/register'> Register</Link ></span></p>
                </fieldset>
            </form>
            {/* {message != "" ?
                <div role="alert" className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{message}</span>
                </div> : ""} */}
            {message && (
                <div role="alert" className="alert alert-success">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{message}</span>
                </div>
            )}
        </div>

    )
}

export default Login
