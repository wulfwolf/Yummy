export type FridgeT = {
  _id: string;
  Owner: string;
  storedFood: Array<storedFoodT>;
};
export type ScheduleT = {
  _id: string;
  recipe: RecipeT;
  date: string;
  meal: string;
  Scheduled: Boolean;
};
export type storedFoodT = {
  _id: string;
  ingredient: IngredientT;
  quantity: number;
};
export type RecipeT = {
  _id: string;
  recipeName: string;
  meal: string;
  instruction: string;
  img: string;
  favorite: Array;
  preparations: Array;
  warningTags:
    | 'HEALTHY FOOD'
    | 'SPICY FOOD'
    | 'FATTY FOOD'
    | 'FASTFOOD'
    | 'ALCOHOL';
};
export type IngredientT = {
  _id: string;
  foodName: string;
  img: string;
  ScanCode: string;
  unit: string;
};
export type NotificationT = {
  _id: string;
  title: string;
  desc: string;
  content: string;
  receiver: string;
};
export type StatusLogT = {
  createdAt: string;
  userBMI: number;
};
