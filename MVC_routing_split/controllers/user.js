
import User from "../models/user.js";


export const test = (req, res) => {
    res.send(" hello how are you")
}



export const register = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password
    })


    res.json({
        success: true,
        message: "registered succesfully",
    })
}


export const getAllUsers = async (req, res) => {

    const users = await User.find({});


    res.json({
        success: true,
        users,
    })
}

export const getUserById = async (req, res) => {


    const id = req.params.id

    const user = await User.findById(id)




    res.json({
        success: true,
        user,
    })

}

/// just testing put , delete with the same route for  , both the ruotes are just defined , no actual functionality is here 
export const updateUser = async (req, res) => {


    const id = req.params.id

    const user = await User.findById(id)




    res.json({
        success: true,
        message: "user updated",
    })

}
export const deleteUser = async (req, res) => {


    const id = req.params.id

    const user = await User.findById(id)




    res.json({
        success: true,
        message: "user deleted",
    })

}


