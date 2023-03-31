const userModel=require("../model/user")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")


exports.getData =async (req,res)=>{
    const result = await userModel.find();

    try {
    res.status(200).json({
        res:result
    })
    } catch (error) {
        res.send(error)
    }
}
exports.postData= async (req, res) => {
	try {
        const hashPass =await bcrypt.hash(req.body.password,10)
		const User = new userModel({
            password:hashPass,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email
        });
		const result = await User.save();
        console.log(result.id);
        const userId =await result.id
        const token= jwt.sign({id:userId},"secretKey",{ expiresIn: "24h" })
		if (!result) {
			res.send("plz check the credentials")
		} else {
            console.log(result);
			res.status(200).json({id:userId,token:token}
			);
		}
	} catch (err) {
        res.send(err)
	}
};
exports.putData=async (req,res)=>{
    try {
        console.log("put hit");
        const user =await userModel.findById(req.params.id)
        if(!user){res.status(400).json("plz check the id")}
        else{
        const result= await userModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json(result)}
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.delData=async (req,res)=>{
    try {
        const user=await userModel.findById(req.params.id);
        !user?res.status(400).json("plz check the id"): {};
        const result =await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json("deleting data successful")

    } catch (error) {
        
    }

}
exports.getIdData=async (req,res)=>{
    try {
        const user=await userModel.findById(req.params.id);
        res.status(200).json(user)

    } catch (error) {
        
    }

}
exports.login=async(req,res)=>{
    try {
        const user =await userModel.findOne({email:req.body.email})
        if (!user) {  
            res.send("email is registered");
        }
        console.log(user.password);
        const pass =bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(result==true){
                const token =jwt.sign({id:user.id},"secretKey",{expiresIn:"24hr"})
                res.send({id:user.id,token:token})
            }
            else{
            res.send("login failed")}
        })
        
    } catch (error) {
        res.send(error)
    }
}