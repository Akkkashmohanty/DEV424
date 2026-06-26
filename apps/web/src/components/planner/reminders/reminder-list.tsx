"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  ListTodo,
} from "lucide-react"

import {
  useTasks,
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "@/features/planner/hooks/use-planner"

import { Task } from "@/features/planner/types/planner.types"

export default function ReminderList() {
  const { data: tasks = [], isLoading } =
    useTasks()

  const createTaskMutation =
    useCreateTask()

  const deleteTaskMutation =
    useDeleteTask()

  const updateTaskMutation =
    useUpdateTask()

  const [newTask, setNewTask] =
    useState("")

  const [newCrop, setNewCrop] =
    useState("")

  const [newPriority, setNewPriority] =
    useState<
      "High" | "Medium" | "Low"
    >("Medium")

  const activeCount = tasks.filter(
    (task: Task) => !task.completed,
  ).length

  const addTask = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault()

    if (!newTask.trim()) {
      return
    }

    await createTaskMutation.mutateAsync({
      title: newTask,
      crop_name:
        newCrop.trim() || "General",
      priority: newPriority,
    })

    setNewTask("")
    setNewCrop("")
    setNewPriority("Medium")
  }

  const toggleTask = async (
    task: Task,
  ) => {
    await updateTaskMutation.mutateAsync({
      taskId: task.id,
      payload: {
        completed:
          !task.completed,
      },
    })
  }

  const deleteTask = async (
    taskId: number,
  ) => {
    await deleteTaskMutation.mutateAsync(
      taskId,
    )
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6">
        Loading tasks...
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight">
            Daily Tasks
          </h3>

          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-extrabold text-white">
              {activeCount}
            </span>
          )}
        </div>

        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <ListTodo className="h-3.5 w-3.5" />
          Farming Checklist
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No tasks created yet.
          </div>
        ) : (
          tasks.map((task: Task) => {
            let priorityColor =
              "bg-gray-100 text-gray-700"

            if (
              task.priority === "High"
            ) {
              priorityColor =
                "bg-red-500/10 text-red-600 font-bold"
            }

            if (
              task.priority ===
              "Medium"
            ) {
              priorityColor =
                "bg-amber-500/10 text-amber-600 font-bold"
            }

            return (
              <div
                key={task.id}
                className={`flex items-center justify-between rounded-2xl border p-3 transition-all ${task.completed
                  ? "border-border/40 bg-muted/10 opacity-60"
                  : "border-border bg-card hover:shadow-sm"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      toggleTask(task)
                    }
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>

                  <div>
                    <span
                      className={`block text-sm font-semibold ${task.completed
                        ? "line-through text-muted-foreground"
                        : ""
                        }`}
                    >
                      {task.title}
                    </span>

                    <span className="mt-1 block text-[10px] font-medium text-muted-foreground">
                      Crop:{" "}
                      {task.crop_name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${priorityColor}`}
                  >
                    {task.priority}
                  </span>

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    className="p-1 text-muted-foreground/60 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      <form
        onSubmit={addTask}
        className="mt-6 space-y-3 border-t border-border pt-6"
      >
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Add New Farming Task
        </h4>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) =>
              setNewTask(
                e.target.value,
              )
            }
            placeholder="Task title"
            className="h-10 rounded-xl border border-border bg-background px-3"
          />

          <input
            type="text"
            value={newCrop}
            onChange={(e) =>
              setNewCrop(
                e.target.value,
              )
            }
            placeholder="Crop name"
            className="h-10 rounded-xl border border-border bg-background px-3"
          />
        </div>

        <div className="flex items-center justify-between">
          <select
            value={newPriority}
            onChange={(e) =>
              setNewPriority(
                e.target.value as
                | "High"
                | "Medium"
                | "Low",
              )
            }
            className="h-9 rounded-lg border border-border px-2"
          >
            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>
          </select>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}