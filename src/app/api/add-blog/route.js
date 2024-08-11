import connectionToDatabase from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectionToDatabase();
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;
    const { error } = AddNewBlog.validate({ title, description });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newlyCreatedBlog = await Blog.create(extractBlogData);
    if (newlyCreatedBlog) {
      return NextResponse.json({
        success: true,
        message: "Blog created successfully",
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
      message: "Something went wrong. Please Try Again",
    });
  }
}
