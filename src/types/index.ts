// import { Ad, Billboard, Category, Conversation, MerchantOrder, Message, Order, OrderList, Products, Seller, Subcategory, User } from "@prisma/client";

import {
  GetAllQuizeForOneUnit,
  GetQuizByIdWithQuestions,
  GetQuizWithAttempts,
} from "@/actions/quiz";
import { GetUsersWithAttempts } from "@/actions/user";
import { Attempt, Prisma, Question, Quiz, Unit, User } from "@prisma/client";
import { z } from "zod";

export type UserType = User;

export type UserWithUnitType = User & {
  passUnit: Unit;
};

export type UnitsOnlyType = Unit;

export type UnitWithAllQuizes = Unit & {
  quizes: Quiz[] & {
    attempts: Attempt[];
  };
};

export type PageProps = {
  params: { userId: string; superAdminId: string; quizId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type QuizType = Quiz;

export type QuestionType = Question;

export type GetAllQuizeForOneUnitType = Prisma.PromiseReturnType<
  typeof GetAllQuizeForOneUnit
>;

export type QuizByIdWithQuestionsType = Prisma.PromiseReturnType<
  typeof GetQuizByIdWithQuestions
>;

export type GetQuizWithAttemptsType = Prisma.PromiseReturnType<
  typeof GetQuizWithAttempts
>;

export type GetUsersWithAttemptsType = Prisma.PromiseReturnType<
  typeof GetUsersWithAttempts
>;
// export type SellerType = Seller & {
//   products: Products[];
// };

// export type ProductType = Products & {
//   seller: Seller;
// };

// export type AdsEndPoint = Seller & {
//   ads: Ad[];
// };

// export type CategoryType = Category;

// export type ConversationType = Conversation & {
//   messages: Message[];
//   users: User[];
// };

// export type SubcategoryType = Subcategory;

// export type MessageType = Message;

// export type AdType = Ad;

// export type OrderListType = OrderList & {
//   product: Products;
//   seller: Seller;
//   order: Order;
// };

// export type MerchantOrderType = MerchantOrder & {
//   order: Order & {
//     customer: User;
//   };
//   seller: Seller;
//   orderLists: OrderList[] & {
//     product: Products;
//   };
// };

// export type BillboardType = Billboard & {
//   ad: Ad & {
//     seller: Seller;
//   };
// };
