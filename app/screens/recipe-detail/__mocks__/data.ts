import faker from '@faker-js/faker';
// Code to generate User Mock data
export const generateLessons = (num: number) => {
  const lessons = [];
  while (num >= 0) {
    lessons.push({
      id: num,
      title: faker.lorem.sentences(1),
    });
    num--;
  }
  return lessons;
};
