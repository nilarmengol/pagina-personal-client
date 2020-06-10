import React, { useState, useEffect } from "react";
import { getCoursesApi } from "../../api/course";
import CoursesList from "../../components/Admin/Courses/CoursesList";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [reloadCourses, setReloadCourses] = useState(false);

  console.log(courses);

  useEffect(() => {
    getCoursesApi().then(response => setCourses(response.message));
    return () => {
      setReloadCourses(false);
    };
  }, [reloadCourses]);

  return (
    <div className="courses">
      <CoursesList courses={courses} setReloadCourses={setReloadCourses} />
    </div>
  );
}
