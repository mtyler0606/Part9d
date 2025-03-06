const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps): JSX.Element => {
    return (
      <h1>{props.name}</h1>
    )
  }

  interface Course {
    name: string,
    exerciseCount: number
  }

  interface ContentProps {
    courses: Course[]
  }
  

  const Content = (props: ContentProps): JSX.Element => {
    return props.courses.map(course => <p>{course.name} {course.exerciseCount}</p>)
  }

  interface TotalProps {
    totalExercises: number
  }

  const Total = (props: TotalProps): JSX.Element => {
    return <p>Number of exercises {props.totalExercises}</p>
  }

  return (
    <div>
      < Header name={courseName} />
      <Content courses={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;