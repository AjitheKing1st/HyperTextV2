import mathImage from "./assets/Math_Logo.jpg"
import scienceImage from "./assets/Science_Logo.jpg"
import englishImage from "./assets/English_Thumbnail.jpg"
import historyImage from "./assets/History_Thumbnail.jpg"

export default [
    {
        topic: "Math",
        thumbnail: mathImage,
        description: `Learn some interesting Mathematical 
        facts that can teach you skills like how to think logically,
        how to identify and state a problem clearly, how to solve
        a problem, and how to apply the appropriate methods to evaluate 
        and solve a problem.`,
        selection: [
            { topic: "Calculus", pages: 10 },
            { topic: "Calculus II", pages: 15 },
            { topic: "Calculus III", pages: 20 },
        ]
    },
    {
        topic: "Science",
        thumbnail: scienceImage,
        description: `Learn and type up a lot of interesting facts about
        science such as: Biology, Chemistry, Physics,
        Earth Science and much more!`,
        selection: [
            { topic: "Biology", pages: 10 },
            { topic: "Chemistry", pages: 15 },
            { topic: "Physics", pages: 20 }
        ]
    },
    {
        topic: "English",
        thumbnail: englishImage,
        description: `Learn some English by typing and 
        learning subjects such as literature, creative writings,
        philology, etymology, poetry and many more!
        `,
        selection: [
            { topic: "Poetry", pages: 10 },
            { topic: "Etymology", pages: 15 },
            { topic: "Philology", pages: 20 }
        ]
    },
    {
        topic: "History",
        thumbnail: historyImage,
        description: `Type up some interesting and random history subjects such as:
        The 20s and 30s in America, World Wonders, Chernobyl Disaster,
        The Cold War, and many more!`,
        selection: [
            { topic: "Chernobyl Disaster", pages: 10 },
            { topic: "20s and 30s in America", pages: 15 },
            { topic: "The Cold War", pages: 20 }
        ]
    }

]
