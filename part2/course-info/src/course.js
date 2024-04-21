const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name}  {part.exercises}
      </p>
    )
  }
  
  const Content = ({ parts }) => {
    return(
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part}/>
        ))}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);
    return (
      <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <p><b> total of {totalExercises} exercises </b></p>
      </div>
    )
  }

  export default Course;