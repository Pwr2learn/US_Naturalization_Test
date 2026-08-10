# USCIS Naturalization Test (2008) Curriculum Specification

This document outlines the official curriculum and scoring data needed to build the logic and content database for your naturalization test preparation app.

## 1. 2008 Civics Test Database

The 2008 civics test contains 100 questions. The provided sample of 20 questions has been extracted into a separate structured JSON file: [civics_database_sample.json](file:///C:/Users/cferr/.gemini/antigravity-ide/brain/0d2a9cb6-cd4d-438f-b054-826f455719c3/civics_database_sample.json). 

> [!IMPORTANT]
> **Dynamic Questions:** Your app must handle dynamic answers for specific questions, as they change based on elections and user location. For the 2008 test, the dynamic questions include:
> - **ID 20:** Who is one of your state's U.S. Senators now? *(Depends on user's zip code/state)*
> - **ID 23:** Name your U.S. Representative. *(Depends on user's zip code/congressional district)*
> - **ID 28:** What is the name of the President of the United States now? *(Time sensitive)*
> - **ID 29:** What is the name of the Vice President of the United States now? *(Time sensitive)*
> - **ID 43:** Who is the Governor of your state now? *(Depends on user's zip code/state)*
> - **ID 46:** What is the political party of the President now? *(Time sensitive)*
> - **ID 47:** What is the name of the Speaker of the House of Representatives now? *(Time sensitive)*

---

## 2. Reading & Writing English Tests

Applicants must demonstrate an ability to read and write in English. The USCIS provides official vocabulary lists from which the test sentences are drawn.

### Official Reading Vocabulary List

* **People:** Abraham Lincoln, George Washington
* **Places:** America, United States, U.S.
* **Civics:** American flag, Bill of Rights, capital, citizen, city, Congress, country, Father of Our Country, government, President, right, Senators, state/states, White House
* **Holidays:** Presidents' Day, Memorial Day, Flag Day, Independence Day, Labor Day, Columbus Day, Thanksgiving
* **Question Words:** How, What, When, Where, Who, Why
* **Verbs:** can, come, do/does, elects, have/has, is/are/was/be, lives/lived, meet, name, pay, vote, want
* **Other (Function):** a, for, here, in, of, on, the, to, we
* **Other (Content):** colors, dollar bill, first, largest, many, most, north, one, people, second, south

#### 10 Sample Reading Sentences (Strictly using official vocabulary)
1. Who is the President?
2. What is the capital of the United States?
3. Who was George Washington?
4. When is Labor Day?
5. The President lives in the White House.
6. What are the colors of the American flag?
7. Who was Abraham Lincoln?
8. Name one right.
9. When do we vote for President?
10. Where does Congress meet?

### Official Writing Vocabulary List

* **People:** Adams, Lincoln, Washington
* **Places:** Alaska, California, Canada, Delaware, Mexico, New York City, United States, Washington D.C.
* **Civics:** American Indians, capital, citizens, Civil War, Congress, Father of Our Country, flag, free, freedom of speech, President, right, Senators, state/states, White House
* **Months:** February, May, June, July, September, October, November
* **Holidays:** Presidents' Day, Memorial Day, Flag Day, Independence Day, Labor Day, Columbus Day, Thanksgiving
* **Verbs:** can, come, elect, have/has, is/was/be, lives/lived, meets, pay, vote, want
* **Other (Function):** and, during, for, here, in, of, on, the, to, we
* **Other (Content):** blue, dollar bill, fifty/50, first, largest, most, north, one, people, red, second, south, taxes, white

#### 10 Sample Writing Sentences (Strictly using official vocabulary)
1. The President lives in the White House.
2. Washington D.C. is the capital of the United States.
3. Washington was the first President.
4. Lincoln was President during the Civil War.
5. Citizens have the right to vote.
6. Congress meets in Washington D.C.
7. We pay taxes in the United States.
8. The flag is red, white, and blue.
9. We vote for President in November.
10. Delaware was the first state.

---

## 3. Speaking & N-400 Interview Practice

The speaking test is not a separate exam but is evaluated throughout the naturalization interview based on the applicant's ability to understand and respond to the officer's questions regarding their N-400 application.

### Structured N-400 Interview Outline

1. **Check-in and Oath:**
   - Greeting and identification verification.
   - Administering the oath to tell the truth.
2. **Personal Information (Part 1-11 of N-400):**
   - Name (Current, previous, and name change requests).
   - Date of birth, Country of birth, Nationality.
   - Contact info, current and previous residences.
   - Parents' citizenship, marital history, children.
   - Employment and education history.
   - Time outside the U.S. (travel history).
3. **Good Moral Character ("Have you ever..." questions - Part 12):**
   - Questions about claiming to be a U.S. citizen, voting illegally.
   - Taxes (filing taxes, owing overdue taxes).
   - Memberships in groups, organizations, or the Communist Party.
   - Criminal history, arrests, convictions, or serving time in prison.
   - Deportation, removal proceedings, or misrepresentation to USCIS.
4. **Attachment to the Constitution & Oath of Allegiance (Part 12 - End):**
   - Support for the Constitution and form of government.
   - Willingness to take the full Oath of Allegiance.
   - Willingness to bear arms or perform noncombatant services for the U.S.

### Common Officer Commands (Must-Know for Applicants)
- "Please remain standing."
- "Raise your right hand."
- "Do you swear to tell the truth, the whole truth, and nothing but the truth?"
- "You can put your hand down and take a seat." / "Please sit down."
- "Show me your permanent resident card (green card)."
- "Please hand me your passport(s)."
- "Read this sentence out loud for me."
- "Write this sentence on the tablet."
- "Please sign your name here."
- "Print your name here."

---

## 4. Scoring Logic & Passing Criteria

To program the app's grading and progression logic correctly, implement the following exact USCIS passing thresholds:

### Civics Test (2008 Version)
* **Maximum Questions Asked:** 10
* **Passing Threshold:** 6 correct answers.
* **Logic:** The test ends immediately once the applicant gets **6 questions correct** (Pass) or gets **5 questions wrong** (Fail, as it becomes mathematically impossible to reach 6).
* **Exception Rule:** Applicants aged 65 or older who have been permanent residents for at least 20 years ("65/20 exemption") only study a subset of 20 specific questions and are still required to answer 6 out of 10 correctly from that smaller list.

### Reading Test
* **Maximum Attempts:** 3 sentences.
* **Passing Threshold:** 1 correct sentence.
* **Logic:** The officer provides up to 3 sentences to read aloud. The test stops and a passing grade is recorded as soon as the applicant reads **1 sentence successfully**. They do not need to read the remaining sentences. A failure occurs only if all 3 sentences are read incorrectly.

### Writing Test
* **Maximum Attempts:** 3 sentences.
* **Passing Threshold:** 1 correct sentence.
* **Logic:** The officer dictates up to 3 sentences for the applicant to write. The test stops and a passing grade is recorded as soon as the applicant writes **1 sentence successfully**. Minor spelling, capitalization, or punctuation errors are generally accepted as long as the meaning is conveyed and it is legible. A failure occurs only if all 3 sentences are written incorrectly.

### Speaking Test
* **Passing Threshold:** Qualitative. Evaluated continuously during the interview. The applicant must show they can understand the officer's instructions and questions and respond meaningfully in English.
* **Logic for App:** This cannot be binary scored like the others. Consider implementing a feature where users can practice listening to common N-400 questions and recording their answers to self-evaluate or compare with a rubric.
