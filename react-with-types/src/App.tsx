interface HeaderProps {
  name:string
}

interface TotalProps {
  total: number
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
  kind: "description"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithDescription | CoursePartSpecial



const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Group Project Count: {part.groupProjectCount}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Background Material: {part.backgroundMaterial}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
        </div>
      );
    case "description":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Description: {part.description}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>Name: {part.name}</p>
          <p>Description: {part.description}</p>
          <p>Exercise Count: {part.exerciseCount}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};


const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};




const Header = ({name}:HeaderProps) => {

  return <h1>{name}</h1>
}

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <div key={index}>
          <h3>Course Part {index + 1}</h3>
          <Part part={part} />
        </div>
      ))}
    </div>
  );
};


const Total = ({total}:TotalProps) => {
  return <p>Number of exercises {total}</p>
}


const App = () => {
  const courseName = 'Half Stack application development'
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
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}  />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;