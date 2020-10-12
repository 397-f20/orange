// const fetchCourse = async () => {
//   const baseUrl = "http://api.asg.northwestern.edu/";
//   fetch(baseUrl, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }).then(res => res.json());
// };

// export default fetchCourse;

const mockCourseFetch = {
  id: 56149,
  title: "Cell Biology",
  term: "2014 Winter",
  school: "WCAS",
  instructor: {
    name: "Gregory J Beitel",
    bio: null,
    address: "Pancoe Pavilion, Room 1407",
    phone: "847/467-7776",
    office_hours: "Wed 1-2pm, Fri 4-5pm"
  },
  subject: "BIOL_SCI",
  catalog_num: "216-0",
  section: "20",
  room: {
    id: 548,
    building_id: 119,
    building_name: "Technological Institute",
    name: "LR3"
  },
  meeting_days: "MoWeFr",
  start_time: "11:00",
  end_time: "11:50",
  start_date: "2014-01-06",
  end_date: "2014-03-15",
  seats: 220,
  overview:
    "Introduction to Cell Biology. Mechanisms that cells use to compartmentalize and transportcellular materials, to move, to regulate growth and death, to communicateand to respond totheir environments.",
  topic: null,
  attributes: "Natural Sciences Distro Area ",
  requirements:
    "Enrollment Requirements: Prerequisite: Students must completed CHEM 172-0 or CHEM 103-0 to register for this course.",
  component: "LEC",
  class_num: 26101,
  course_id: 19885,
  course_descriptions: [
    {
      name: "Class Materials (Required)",
      desc:
        "Alberts et al. 2013. Essential Cell Biology, 4th edition. ISBN: 9780815344544. Up to date Clicker"
    },
    {
      name: "Teaching Method",
      desc:
        "Active learning exercises, lectures. Two exams (One in finals week but not cumulative) and multiple quizzes."
    },
    {
      name: "Registration Requirements",
      desc: "Prerequisites: CHEM 103 or 172"
    }
  ],
  course_components: [
    {
      component: "DIS",
      meeting_days: "We",
      start_time: "19:00",
      end_time: "20:50",
      section: "60",
      room: "Technological Institute AUD"
    }
  ]
};

export default mockCourseFetch;
