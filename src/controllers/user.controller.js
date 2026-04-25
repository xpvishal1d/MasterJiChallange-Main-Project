import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists : username, email
  // chech for images
  // check for avatar : required
  // upload them to cloudinary, avatar
  // Create user object - create entry in db
  // remove password and refresh token fiels from response
  // check for user creation
  // return res

  const { fullName, username, email, password } = req.body;
  //   console.log(req);

  if (
    [fullName, email, username, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0].path;
  const coverImageLocalPath = req.files?.coverImage[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required : Cloudinary Url");
  }

  const userObject = {
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  };

  const user = await User.create(userObject);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(new apiResponse(200, createdUser, "User registered successfully!"))
});

export { registerUser };
