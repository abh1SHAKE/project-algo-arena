import React from 'react';
import styles from './ProblemDetails.module.css';

const ProblemDetails:React.FC = () => {
    return (
        <div className={`${styles["problem-details-container"]} flex-column gap-12`}>
            <div className={`${styles["problem-heading-section"]} flex-column gap-12`}>
                <div className={`${styles["problem-heading"]}`}>
                    TWO - SUM
                </div>
                <div className={`${styles["problem-topic-pills"]} flex-row gap-12`}>
                    <div className={`${styles["topic-pill"]}`}>
                        Arrays
                    </div>
                    <div className={`${styles["topic-pill"]}`}>
                        Two-Pointers
                    </div>
                </div>
            </div>

            <div className={`${styles["description-and-examples"]} flex-column gap-28`}>
                <div className={`${styles["problem-description"]} flex-column gap-12`}>
                    <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
                    <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
                    <p>You can return the answer in any order.</p>
                </div>
                <div className={`${styles["problem-examples"]} flex-column gap-20`}>
                    <div className={`${styles["example"]} flex-column gap-8`}>
                        Example 1:
                        <div>
                            <strong>Input: </strong>
                            nums = [2,7,11,15], target = 9
                        </div>
                        <div>
                            <strong>Output: </strong>
                            [0,1]
                        </div>
                        <div>
                            <strong>Explanation: </strong>
                            Because nums[0] + nums[1] == 9, we return [0, 1].
                        </div>
                    </div>
                    <div className={`${styles["example"]} flex-column gap-8`}>
                        Example 2:
                        <div>
                            <strong>Input: </strong>
                            Input: nums = [3,2,4], target = 6
                        </div>
                        <div>
                            <strong>Output: </strong>
                            [1,2]
                        </div>
                        <div>
                            <strong>Explanation: </strong>
                            Because nums[1] + nums[2] == 6, we return [1, 2].
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles["problem-constraints"]} flex-column gap-8`}>
                <div><strong>Constraints:</strong></div>
                <div className={`${styles["pointers"]}`}>
                    <ul className='flex-column gap-4'>
                        <li><code>{`2 <= nums.length <= 104`}</code></li>
                        <li><code>{`-109 <= nums[i] <= 109`}</code></li>
                        <li><code>{`-109 <= target <= 109`}</code></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default ProblemDetails;