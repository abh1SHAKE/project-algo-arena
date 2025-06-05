import React from "react";
import styles from "./ProblemDetails.module.css";
import { ProblemData } from "@/types/problem";

interface ProblemDetailsProps {
  problemData: ProblemData;
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ problemData }) => {
  const createMarkup = (htmlString: string) => {
    const formatted = htmlString
      .replace(/\\n\\n/g, "</p><p>")
      .replace(/\\n/g, "<br />");
    return { __html: `<p>${formatted}</p>` };
  };

  return (
    <div
      className={`${styles["problem-details-container"]} flex-column gap-12`}
    >
      <div
        className={`${styles["problem-heading-section"]} flex-column gap-12`}
      >
        <div className={`${styles["problem-heading"]}`}>
          {problemData.problem_title.toUpperCase()}
        </div>
        <div className={`${styles["problem-topic-pills"]} flex-row gap-12`}>
          {problemData.problem_topics.map((topic, index) => (
            <div key={index} className={`${styles["topic-pill"]}`}>
              {topic}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles["description-and-examples"]} flex-column gap-28`}
      >
        <div className={`${styles["problem-description"]} flex-column gap-12`}>
          <div
            dangerouslySetInnerHTML={createMarkup(
              problemData.problem_description
            )}
          />
        </div>
        <div className={`${styles["problem-examples"]} flex-column gap-20`}>
          {problemData.problem_examples.map((example, index) => (
            <div
              key={index}
              className={`${styles["example"]} flex-column gap-8`}
            >
              Example {index + 1}:
              <div>
                <strong>Input: </strong>
                {example.input}
              </div>
              <div>
                <strong>Output: </strong>
                {example.output}
              </div>
              <div>
                <strong>Explanation: </strong>
                <div
                  dangerouslySetInnerHTML={createMarkup(example.explanation)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles["problem-constraints"]} flex-column gap-8`}>
        <div>
          <strong>Constraints:</strong>
        </div>
        <div className={`${styles["pointers"]}`}>
          <ul className="flex-column gap-4">
            {problemData.problem_constraints.map((constraint, index) => (
              <li key={index}>
                <code>{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetails;
