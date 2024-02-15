import React, { useEffect } from "react";
import { useState } from "react";

const Resume = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  useEffect(() => {
    async function fetchResume() {
      const response = await fetch(
        `http://localhost:8080/resume/getresume/${user.resumeId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.length === 1 && responseData[0] === null) {
        return;
      }
      setAbout(responseData[0].about);
      setEducation(responseData[0].education);
      setExperience(responseData[0].experience);
      setSkills(responseData[0].skills);
      localStorage.setItem("resume", JSON.stringify(responseData[0]));
    }
    fetchResume();
  }, []);

  const [about, setAbout] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  function handleEdit(e) {
    e.preventDefault();
    setIsEdit(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/resume/update/asnew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.resumeId,
        about: about,
        education: education,
        experience: experience,
        skills: skills,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData);
    setIsEdit(false);
  }

  return (
    <div style={{ margin: "7%" }}>
      <form>
        <div s>
          {!isEdit ? (
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          )}
        </div>

        <div>
          <h2>About</h2>
          {isEdit ? (
            <textarea
              className="form-control"
              id="about"
              rows="3"
              value={about != null ? about : "no About"}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          ) : (
            <p>{about != null ? about : "no About"}</p>
          )}
        </div>

        {/* <h2>Education</h2>
        <h2>Experience</h2>
        <h2>Skills</h2> */}

        <div>
          <h2>Education</h2>
          {isEdit ? (
            <textarea
              className="form-control"
              id="education"
              rows="3"
              value={education != null ? education : "no Education"}
              onChange={(e) => setEducation(e.target.value)}
            ></textarea>
          ) : (
            <p>{education != null ? education : "no Education"}</p>
          )}
        </div>

        <div>
          <h2>Experience</h2>
          {isEdit ? (
            <textarea
              className="form-control"
              id="experience"
              rows="3"
              value={experience != null ? experience : "no Experience"}
              onChange={(e) => setExperience(e.target.value)}
            ></textarea>
          ) : (
            <p>{experience != null ? experience : "no Experience"}</p>
          )}
        </div>

        <div>
          <h2>Skills</h2>
          {isEdit ? (
            <textarea
              className="form-control"
              id="skills"
              rows="3"
              value={skills != null ? skills : "no Skills"}
              onChange={(e) => setSkills(e.target.value)}
            ></textarea>
          ) : (
            <p>{skills != null ? skills : "no Skills"}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Resume;
