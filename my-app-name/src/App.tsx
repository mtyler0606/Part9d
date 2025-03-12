const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CourseDescription {
    description: string;
  }

  interface CoursePartBasic extends CoursePartBase, CourseDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartBase, CourseDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartBase, CourseDescription {
    requirements: string[];
    kind: "special";
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },

    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
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

  interface ContentProps {
    courses: CoursePart[]
  }
  

  interface PartProps {
    course: CoursePart;
  }
  const Content = (props: ContentProps): JSX.Element => {
    return props.courses.map(course => <Part course={course}/>)
  }

  interface TotalProps {
    totalExercises: number
  }

  const Total = (props: TotalProps): JSX.Element => {
    return <p>Number of exercises {props.totalExercises}</p>
  }
  
  const assertNever = (value: never): never => {
    throw new Error( `Unhandled discriminated union member: ${JSON.stringify(value)}`)
  }

  const Part = (props: PartProps): JSX.Element => {
    switch(props.course.kind){
      case "basic":
        return (
          <>
          <p><b>{props.course.name} {props.course.exerciseCount}</b></p>
          <p><i>{props.course.description}</i></p>
          <br/>
          </>
        )
        break;
      case "group":
        return (
          <>
          <p><b>{props.course.name} {props.course.exerciseCount}</b></p>
          <p>project exercises {props.course.groupProjectCount}</p>
          <br/>
          </>
        )
        break;
      case "background":
        return (
          <>
           <p><b>{props.course.name} {props.course.exerciseCount}</b></p>
           <p><i>{props.course.description}</i></p>
           <p>required skills: {props.course.backgroundMaterial}</p>
           <br/>
          </>
        )
        break;
      case "special":
        return (
          <>
           <p><b>{props.course.name} {props.course.exerciseCount}</b></p>
           <p><i>{props.course.description}</i></p>
           <p>required skills: {props.course.requirements}</p>
           <br/>
          </>
        )
        break;
      default:
        return assertNever(props.course);
    }  };

  return (
    <div>
      < Header name={courseName} />
      <Content courses={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;