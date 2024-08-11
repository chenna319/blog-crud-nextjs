import connectionToDatabase from "@/database";
import Blog from "@/models/blog";
import Joi, { string } from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectionToDatabase();
    const { searchParams } = new URL(req.url);
    const getEditedId = searchParams.get("id");

    if (!getEditedId) {
      return NextResponse.json({
        success: false,
        message: "Blog Id is required",
      });
    }

    const { title, description } = await req.json();

    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updateBlogById = await Blog.findOneAndUpdate(
      { _id: getEditedId },
      { title, description },
      { new: true }
    );

    if (updateBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog edited successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong. Please Try Again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
