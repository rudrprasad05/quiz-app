"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuesitonContext } from "@/context/QuesitonContext";
import { QuestionType } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import clsx from "clsx";
import { Cog, GripVertical, Trash, Upload } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MultipleChoice } from "@prisma/client";

const mc = ["a", "b", "c", "d"];

const QuestionCardInput = ({
  index,
  question,
}: {
  index: number;
  question: QuestionType;
}) => {
  const id = index;
  const { questions, addQuestion, removeQuestion, updateQuestion } =
    useContext(QuesitonContext);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const handleOnDrop = (e: React.DragEvent) => {};
  const handleDragOver = (e: React.DragEvent) => {};
  const handleDragStart = (e: React.DragEvent, type: string) => {};
  const handleOnClickBody = (e: React.MouseEvent) => {};
  const handleDelete = () => {
    removeQuestion(question.id);
  };
  function handleImageUpload(arg0: File) {
    throw new Error("Function not implemented.");
  }

  return (
    <Card
      onDrop={(e) => {
        handleOnDrop(e);
      }}
      onDragOver={handleDragOver}
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "container")}
      ref={setNodeRef}
      className="relative flex border-muted-foreground flex-row p-6 rounded-tr-none"
    >
      <div className="pr-3">Q{index + 1}</div>

      <div className="pl-3 grow">
        <Input
          onBlur={(e) => {
            question.question = e.target.value;
            updateQuestion(question);
          }}
          placeholder="enter question"
        />
        <div className="grid grid-cols-2 pt-6 gap-3">
          {Array.from(Array(4).keys()).map((i) => (
            <Input
              onBlur={(e) => {
                question.options[i] = e.target.value;
                updateQuestion(question);
              }}
              placeholder={`enter option ${mc[i]}`}
            />
          ))}
        </div>
      </div>

      <div className="pl-6">
        <Label className="h-10 flex flex-row items-center gap-3 ">
          Settings <Cog />
        </Label>
        <div className="grid grid-cols-1 pt-6 gap-3">
          <div className="flex gap-3 items-center">
            <Label>answer</Label>
            <Select
              onValueChange={(e) => {
                question.answer = e.toUpperCase() as MultipleChoice;
                updateQuestion(question);
              }}
              defaultValue={"a"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a week" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem key={`a`} value={`a`}>
                  A
                </SelectItem>
                <SelectItem key={`b`} value={`b`}>
                  B
                </SelectItem>
                <SelectItem key={`c`} value={`c`}>
                  C
                </SelectItem>
                <SelectItem key={`d`} value={`d`}>
                  D
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <label
            htmlFor="file"
            className={cn(
              "cursor-pointer",
              imageUpload && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "items-center rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex gap-3",
                isImageInCloud && "opacity-50 cursor-not-allowed"
              )}
            >
              <Upload />
              <h2 className="text-sm">Upload Image</h2>
            </div>
            <input
              id="file"
              type="file"
              name="file"
              disabled={isImageInCloud}
              hidden
              onChange={(e) => {
                handleImageUpload(e.target.files?.[0] as File);
              }}
            />
          </label>
        </div>
      </div>

      <div className="flex text-secondary gap-2 absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
        <Trash size={16} onClick={() => handleDelete()} />
        {/* ref={setNodeRef}/ */}
        <div {...attributes} {...listeners}>
          <GripVertical size={16} />
        </div>
      </div>
    </Card>
  );
};

export default QuestionCardInput;
