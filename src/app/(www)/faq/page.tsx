// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { Strong } from "@/components/ui/Strong";

// type QuestionType = {
//   question: string;
//   answer: string;
// };

// TODO
// const questions = [
//   { question: "Question 1", answer: "Answer to question 1" },
//   { question: "Question 2", answer: "Answer to question 2" },
//   { question: "Question 3", answer: "Answer to question 3" },
//   { question: "Question 4", answer: "Answer to question 4" },
// ] satisfies QuestionType[];

export default function FAQ() {
  return (
    // <div className="h-full w-full px-4 py-12 md:pt-24">
    //   <Accordion type="multiple" className="mx-auto max-w-3xl">
    //     {questions.map((question, index) => (
    //       <AccordionItem key={index} value={`item-${index + 1}`}>
    //         <AccordionTrigger>{question.question}</AccordionTrigger>
    //         <AccordionContent>{question.answer}</AccordionContent>
    //       </AccordionItem>
    //     ))}
    //   </Accordion>
    // </div>

    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div>In progress...</div>
      <div>
        Meanwhile, you can read{" "}
        <Strong variant="link">
          <a
            href="https://gwern.net/dnb-faq"
            target="_blank"
            rel="noopener noreferrer"
          >
            this Frequently Asked Questions
          </a>
        </Strong>
        .
      </div>
    </div>
  );
}
