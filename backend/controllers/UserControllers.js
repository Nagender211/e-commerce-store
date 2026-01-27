import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utiles/SendEmail.js";
import dotenv from 'dotenv'
import { sendCookie } from "../utiles/authCookie.js";
// import Cookies from 'Cookies'
dotenv.config()

const cookieOption={
    httpOnly: true,
    maxAge: 1000*60*60*24*7,
    source: process.env.JWT_ENV || 'dev',
    sameSite: 'lax'
}
export const Testing = (req, res) => {
  try {
    res.send({ message: "hello world" });
  } catch (error) {
    console.log("error while testing", error);
  }
};
export const Register = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    if (!username || !email || !password || !confirmpassword) {
      return res.status(404).json({
        message: "please enter the all the fields",
      });
    }
    if (password !== confirmpassword) {
      return res.status(404).json({
        message: "please match the password",
      });
    }
    const exitinguser = await User.findOne({ email });
    if (exitinguser) {
      return res.status(409).json({
        message: "user is already exists",
      });
    }
    const salt = 10;
    const hasshedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hasshedpassword,
    });
    const token=sendCookie({id: user._id,email: user.email})
    res.cookie('token',token,cookieOption)
    res.status(201).json({
      message: "succesfully created user",
      data: user,
    });
  } catch (error) {
    console.log("error while creating user", error);
    return res.status(501).json({
      message: "Something went worng please try again",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "please enter the all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user is not found please register",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).json({
        message: "password is incrroct",
      });
    }
    const token=sendCookie({id: user._id,email: user.email})
    res.cookie('token',token,cookieOption)
    console.log("token is login",token)

    res.status(200).json({
      message: "login is succefully",
      data: user,
    });
  } catch (error) {
    console.log("error while login", error);
    return res.status(501).json({
      message: "Something went worng please try again",
    });
  }
};

export const forgotPassword = async (req,res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user is not found please register",
      });
    }
    const otpexpire = Date.now() + 10 * 60 * 1000;
    const otp = Math.floor(Math.random() * 900000 + 100000);

    user.otp = otp;
    user.expiretime = otpexpire;
    await user.save();
    await sendEmail({
      to: user.email,
      subject: `OTP FOR THE PASSWORD REST`,
      text: `your plane text otp ${otp}`,
    });
    res.status(200).json({
      message: "otp is sent to your email please check it once",
      
    });
  } catch (error) {
    console.log("error while generating the otp", error);
  }
};

export const confirmOtp = async (req, res) => {
  const { otp,email } = req.body;
  if (!otp || !email) {
    return res.status(404).json({
      message: "please enter your otp",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user is not found please register",
    });
  }
  console.log("user opti matching",otp,"type of otp maching", typeof otp)
  if (user.otp !== otp) {
    return res.status(404).json({
      message: "opt is incorrect",
    });
  }
  if (user.expiretime < Date.now()) {
    return res.status(404).json({
      message: "opt is expired",
    });
  }
  user.otp = undefined;
  user.expiretime = undefined;
  await user.save();
  await sendEmail({
    to: user.email,
    subject: "your otp is succefuly done",
    text: "you can now change reset the password",
    html: `<h1>you can now change reset the password</h1>`,
  });
  res.status(200).json({
    message: "you can now change reset the password",
  });
};

export const restPassword = async (req, res) => {
  const { password, confirmpassword } = req.body;
  if (!password || !confirmpassword) {
    return res.status(404).json({
      message: "please enter the all the fieldes",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user is not found please register",
    });
  }
  const salt = 10;
  const hasspassword = await bcrypt.hash(password, salt);
  // const newPassw=await User.create({password: hasspassword})
  user.password = hasspassword;
  user.save();
  await sendEmail({
    to: user.email,
    subject: "password reset is done",
    text: `NOw you can enjoy the new password restt and login by the new password`,
    html: `<h1>NOw you can enjoy the new password restt and login by the new password</h1>`,
  });
  res.status(201).json({
    message: "password is rested",
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res.status(404).json({
        message: "user is not found please register",
      });
    }
    user.save();
    res.status(200).json({
      message: "updated username",
      username: user.username,
    });
  } catch (error) {
    console.log("error while updating the profile", error);
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "user is not found please register",
      });
    }
    res.status(200).json({
      message: "user is found",
      data: user.email
    });
  } catch (error) {
    return res.status(501).json({
      message: "server error during getting the you",
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "user is deleted",
      id: deleteuser._id,
    });
  } catch (error) {
    return res.status(501).json({
      message: "server error during delete user",
    });
  }
};
export const logout=(req,res)=>{
    try {
        res.clearCookie('token',cookieOption);
        res.status(200).json({
            message: "logout succefully"
        })
    } catch (error) {
        console.log("error while logout",error)
        return res.status(500).json({
            message: "something went wrong"
        })
    }
}



// email verification
export const sendOtpVerification = async (req, res) => {
  try {
    // const res=await
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        message: "please enter the all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user is not found please register",
      });
    }
        if (user.verified) {
  return res.status(200).json({
    message: "email already verified"
  });
}
    const otp = Math.floor(Math.random() * 900000 + 100000);
    const exipreTime = new Date(Date.now() + 10 * 60 * 1000);
    user.emailotp = otp;
    user.emailotpexpire = exipreTime;
    await user.save();
    await sendEmail({
      to: user.email,
      subject: "Your verification otp code",
      text: `your verification code is ${otp}`,
      html: `<h1>your verification code is ${otp}</h1>`,
    });
    res.status(201).json({
      message: "opt is sent succefully for the verification",
    });
  } catch (error) {
    console.log("error while sending the email otp", error);
  }
};

export const confirmVerificationOtp = async (req,res) => {
  try {
    const { emailotp,email } = req.body;
    console.log("opt for emila",emailotp)
    if (!emailotp || !email) {
      return res.status(404).json({
        message: "please enter your otp",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user is not found please register",
      });
    }
    console.log("otp from user.top",user.emailotp,"type of", typeof user.emailotp)
    const converted=Number(emailotp)
    console.log("otp from Normal otp",converted,"type of", typeof converted)
    if (user.emailotp !== converted) {
      return res.status(404).json({
        message: "otp is inncrect",
      });
    }
    // const exipreTime = Date.now() + 10 * 60 * 1000;
    if (user.emailotpexpire < Date.now()) {
      return res.status(404).json({
        message: "opt is expired please generate another otp",
      });
    }


    user.verified=true
    user.emailotp=undefined;
    user.emailotpexpire=undefined;

    await user.save();
    await sendEmail({
        to: user.email,
        subject: "thank you for otp verification is done",
        text: `thank you verification`,
        html: `<h1>thank you verification</h1>`
    })
    res.status(200).json({
        message: "succefully verification is done"
    })
  } catch (error) {
    console.log("error while sending the attempting otp", error);
  }
};


