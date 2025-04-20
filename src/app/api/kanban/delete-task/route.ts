import { NextResponse } from "next/server";
import KanbanData from "../KanbanData";

export async function DELETE(req: any) {
  try {
    const { taskId } = await req.json();
    const updatedTodoData = KanbanData.filter((task) => task.id !== taskId);
    return NextResponse.json({
      status: 200,
      msg: "success",
      data: updatedTodoData,
    });
  } catch (error) {
    return NextResponse.json({ status: 400, msg: "failed", error });
  }
}
