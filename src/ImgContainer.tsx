import { User } from 'classes/User'
import React from 'react'

export const ImgContainer = ({ userActive }: { userActive: User }) => {
    const getUrlImg = () => userActive.name == "Rosie" ? `${process.env.PUBLIC_URL}/rosie.jpg` : `${process.env.PUBLIC_URL}/default-user-icon.jpg`

    return (
        <div className="row-img-user-container">
            {userActive &&
                <img src={getUrlImg()} />            }
        </div>

    )
}