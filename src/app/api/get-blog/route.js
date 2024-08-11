import connectionToDatabase from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectionToDatabase();

    const getAllBlogsFromDatabase = await Blog.find({});

    if (getAllBlogsFromDatabase) {
      return NextResponse.json({
        success: true,
        data: getAllBlogsFromDatabase,
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
