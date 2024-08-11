import connectionToDatabase from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectionToDatabase();

    const { searchParams } = new URL(req.url);
    const getRequestedBlogId = searchParams.get("id");

    if (!getRequestedBlogId) {
      return NextResponse.json({
        success: false,
        message: "Blog Id Required`",
      });
    }
    const deleteBlogById = await Blog.findByIdAndDelete(getRequestedBlogId);
    if (deleteBlogById) {
      return NextResponse.json({
        success: true,
        message: "Blog Deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
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
