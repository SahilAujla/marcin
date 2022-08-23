import React, { useState } from "react"
import UAuth from "@uauth/js"
import { Button } from "react-bootstrap"

const uauth = new UAuth({
    clientID: "fd993dd1-4d9b-4f52-95d8-b5dfbf4695ef",
    redirectUri: "https://marcin.vercel.app/",
})

function UnstoppableLogin() {
    const [Uauth, setUauth] = useState()

    async function Connect() {
        try {
            const authorization = await uauth.loginWithPopup()
            setUauth(JSON.parse(JSON.stringify(authorization))["idToken"])

            await authenticate()
        } catch (error) {
            console.error(error)
        }
    }

    async function logOut() {
        uauth.logout()
        logout()
    }

    function log() {
        if (Uauth === null || Uauth === undefined) {
            Connect()
        } else {
            logOut()
        }
    }

    return (
        <>
            <Button onClick={log}  className="block px-2 py-4 rounded-lg  bg-[#10fcc7] text-xl text-white  cursor-pointer">
                {Uauth != null ? Uauth["sub"] : "Login with UNSD"}
            </Button>
        </>
    )
}

export default UnstoppableLogin;
