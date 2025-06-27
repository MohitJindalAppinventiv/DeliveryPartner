
export interface Review{
  id:string;
  rating:number;
  feedback:string;
  tags:string[]
}

export const reviewsData:Review[] = [
  {
    id: "1",
    rating: 5,
    feedback: "Very polite and quick delivery.",
    tags: ["#polite", "#fast"]
  },
  {
    id: "2",
    rating: 3,
    feedback: "Late delivery, but was kind.",
    tags: ["#late", "#kind"]
  },
  {
    id: "3",
    rating: 4,
    feedback: "Handled food with care, decent timing.",
    tags: ["#careful", "#onTime"]
  },
  {
    id: "4",
    rating: 2,
    feedback: "Rude behavior and late delivery.",
    tags: ["#rude", "#late"]
  },
  {
    id: "5",
    rating: 5,
    feedback: "Excellent attitude and fast service.",
    tags: ["#excellent", "#speedy"]
  },
  {
    id: "6",
    rating: 4,
    feedback: "Good delivery, but forgot cutlery.",
    tags: ["#goodService", "#missingItem"]
  },
  {
    id: "7",
    rating: 1,
    feedback: "Very late and rude delivery partner.",
    tags: ["#late", "#rude"]
  },
  {
    id: "8",
    rating: 5,
    feedback: "Super friendly and arrived early.",
    tags: ["#friendly", "#early"]
  },
  {
    id: "9",
    rating: 3,
    feedback: "Delivery was okay, nothing special.",
    tags: ["#average", "#okay"]
  },
  {
    id: "10",
    rating: 4,
    feedback: "Punctual and maintained hygiene.",
    tags: ["#punctual", "#hygienic"]
  },
  {
    id: "11",
    rating: 2,
    feedback: "Delivery was slow and unprofessional.",
    tags: ["#slow", "#unprofessional"]
  },
  {
    id: "12",
    rating: 5,
    feedback: "Perfect timing and very respectful.",
    tags: ["#onTime", "#respectful"]
  },
  {
    id: "13",
    rating: 4,
    feedback: "Reached location easily and behaved well.",
    tags: ["#navigatedWell", "#polite"]
  },
  {
    id: "14",
    rating: 3,
    feedback: "Average experience, nothing wrong.",
    tags: ["#neutral"]
  },
  {
    id: "15",
    rating: 1,
    feedback: "Extremely late and food was spilled.",
    tags: ["#veryLate", "#spilledFood"]
  },
  {
    id: "16",
    rating: 5,
    feedback: "Super fast and courteous.",
    tags: ["#fast", "#courteous"]
  },
  {
    id: "17",
    rating: 2,
    feedback: "Lost direction and delivered cold food.",
    tags: ["#lost", "#coldFood"]
  },
  {
    id: "18",
    rating: 4,
    feedback: "Helpful and followed instructions well.",
    tags: ["#helpful", "#followsInstructions"]
  },
  {
    id: "19",
    rating: 5,
    feedback: "Delivery partner had a great attitude.",
    tags: ["#positiveAttitude", "#greatService"]
  },
  {
    id: "20",
    rating: 3,
    feedback: "Was in a hurry but delivered on time.",
    tags: ["#hurried", "#onTime"]
  }
];
