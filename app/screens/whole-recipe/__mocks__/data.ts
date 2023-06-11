import faker from '@faker-js/faker';

export const generateCourses = (num: number) => {
  const courses = [];
  while (num >= 0) {
    courses.push({
      id: num,
      name: faker.lorem.sentences(1),
      desc: faker.lorem.sentences(1),
      image: faker.image.image(),
      cost: 'FREE',
      intersted: faker.random.number({min: 70, max: 100}),
    });
    num--;
  }
  return courses;
};
