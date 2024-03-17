"use client";
import { QuestionType, QuizType } from "@/types";
import React, { useContext, useState } from "react";

import Header from "../header/Header";
import NewQuestion from "../NewQuestion";
import BuilderNav from "./BuilderNav";
import { QuesitonContext } from "@/context/QuesitonContext";
import QuestionCardInput from "../QuestionCardInput";
import { string } from "zod";
import { motion, useDragControls } from "framer-motion";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

const questionTemp = {
  question: "",
  image: "",
  options: [],
  quizId: "",
  answer: "a",
};

const QuizBuilder = ({ quiz }: { quiz: QuizType }) => {
  const id = quiz.id;
  const { questions, addQuestion } = useContext(QuesitonContext);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const [activeId, setActiveId] = useState(null);
  const controls = useDragControls();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const sensors = useSensors(mouseSensor);

  function handleDragEnd(event: DragEndEvent): void {
    setActiveId(null);
    const { active, over } = event;
    const activeId = active.id.toString();
    const overId = over?.id.toString();
    console.log(event.over?.id, activeId);

    if (active.id !== over?.id) {
      let temp = questions.map((i) => i);
      var activePos = temp
        .map(function (x) {
          return x?.id;
        })
        .indexOf(activeId);
      var overPos = 0;
      if (overId != undefined)
        overPos = temp
          .map(function (x) {
            return x?.id;
          })
          .indexOf(overId);

      const tempArr = arrayMove(temp, activePos, overPos);
      let tempState = questions;
      tempState = tempArr;
    }
  }

  function handleDragStart(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(event.active.id);
  }

  return (
    <div className="w-full grow">
      <BuilderNav quiz={quiz} />
      <div className="p-6">
        <div className="flex flex-col gap-6 pb-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            modifiers={[
              restrictToVerticalAxis,
              restrictToFirstScrollableAncestor,
            ]}
          >
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={questions}
            >
              {questions.map((i, index) => (
                <QuestionCardInput index={index} key={index} question={i} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <NewQuestion />
      </div>
      {/* <Header quiz={quiz}/> */}
    </div>
  );
};

export default QuizBuilder;
