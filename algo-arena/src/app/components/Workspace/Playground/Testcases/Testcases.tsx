import React, { useState } from "react";
import styles from "./Testcases.module.css";
import axios from "axios";

interface Testcase {
  input: string;
  output: string;
}

interface RunResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  status: string;
  stderr: string | null;
  compile_output: string | null;
}

interface TestcasesProps {
  testcases: Testcase[];
  isExpanded?: boolean;
  onTabClick?: () => void;
  userCode: string;
}

const Testcases: React.FC<TestcasesProps> = ({
  testcases,
  onTabClick,
  isExpanded,
  userCode,
}) => {
  const [activeTestcase, setActiveTestcase] = useState(0);
  const [runResults, setRunResults] = useState<RunResult[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const runCode = async () => {
    if (!userCode) return;
    setIsEvaluating(true);

    const languageId = 62;

    const submissions = testcases.map(({ input }) => ({
      source_code: userCode,
      language_id: languageId,
      stdin: input,
    }));

    try {
      const batchRes = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=false&wait=false",
        { submissions },
        {
          headers: {
            "content-type": "application/json",
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const tokens = batchRes.data.map((item: { token: string }) => item.token);

      const results = await Promise.all(
        tokens.map(async (token: string) => {
          let result;
          while (true) {
            const res = await axios.get(
              `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
              {
                headers: {
                  "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
                  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                },
              }
            );
            result = res.data;
            if (
              result.status &&
              result.status.description !== "In Queue" &&
              result.status.description !== "Processing"
            ) {
              break;
            }
            await new Promise((r) => setTimeout(r, 1000));
          }
          return result;
        })
      );

      const responses = results.map((res, idx) => ({
        input: testcases[idx].input,
        expectedOutput: testcases[idx].output.trim(),
        actualOutput: res.stdout?.trim() || "",
        passed: res.stdout?.trim() === testcases[idx].output.trim(),
        status: res.status.description,
        stderr: res.stderr,
        compile_output: res.compile_output,
      }));

      console.log("Run Results:", responses);
      setRunResults(responses);
    } catch (error) {
      console.error("Error during Judge0 batch submission", error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const getStatus = () => {
    if (isEvaluating) return { message: "Evaluating...", color: "#CDCDCD" };

    if (runResults.length === 0) return { message: "", color: "" };

    const passedCount = runResults.filter((r) => r.passed).length;
    const total = runResults.length;

    if (passedCount === total)
      return { message: "All testcases passed", color: "#77FCBA" };
    if (passedCount === 0)
      return { message: "All testcases failed", color: "#FD4040" };

    return {
      message: `${passedCount}/${total} testcases passed`,
      color: "goldenrod",
    };
  };

  const { message, color } = getStatus();

  const formatTestcaseData = (data: string) => {
    return data.replace(/\\n/g, "\n");
  };

  const parseInput = (input: string) => {
    const lines = formatTestcaseData(input).split("\n");
    return lines.map((line, index) => ({
      label: `Input ${index + 1}:`,
      value: line.trim(),
    }));
  };

  return (
    <div className={`${styles["testcases-wrapper"]} position-relative`}>
      <div className={`${styles["top-section"]}`}>
        <div
          className={`${styles["header-section"]} flex-row justify-content-space-between`}
        >
          <div className={`${styles["cta-container"]} gap-12 flex-row`}>
            <div
              className={`${styles["run-cta"]} flex-row cursor-pointer`}
              onClick={runCode}
            >
              RUN
            </div>
            <div
              className={`${styles["status"]} flex-row align-items-center cursor-pointer`}
              style={{ color }}
            >
              {message}
            </div>
          </div>
          <div
            className={`${styles["tab"]} flex-row align-items-center gap-4 cursor-pointer`}
            onClick={onTabClick}
          >
            TESTCASES
            <div
              className={`${styles["chevron-icon"]} flex-row`}
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m6 9l6 6l6-6"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={`${styles["testcases-tab-section"]} flex-row gap-24`}>
          {testcases.map((_, index) => (
            <div
              key={index}
              className={`${styles["testcase-tab"]} ${
                activeTestcase === index ? styles["active"] : ""
              }`}
              onClick={() => setActiveTestcase(index)}
            >
              CASE {index + 1}
            </div>
          ))}
        </div>
      </div>

      {testcases.length > 0 && testcases[activeTestcase] && (
        <>
          {parseInput(testcases[activeTestcase].input).map(
            (inputItem, index) => (
              <div key={index} className={`${styles["input-output-wrapper"]}`}>
                <div className={`${styles["io-container"]} flex-column gap-8`}>
                  <div className={`${styles["label"]}`}>{inputItem.label}</div>
                  <div className={`${styles["container"]}`}>
                    {inputItem.value}
                  </div>
                </div>
              </div>
            )
          )}

          <div className={`${styles["input-output-wrapper"]}`}>
            <div className={`${styles["io-container"]} flex-column gap-8`}>
              <div className={`${styles["label"]}`}>Expected Output:</div>
              <div className={`${styles["container"]}`}>
                {formatTestcaseData(testcases[activeTestcase].output)}
              </div>
            </div>
          </div>
        </>
      )}

      {testcases.length === 0 && (
        <div className={`${styles["input-output-wrapper"]}`}>
          <div className={`${styles["io-container"]} flex-column gap-8`}>
            <div>No testcases available</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testcases;
