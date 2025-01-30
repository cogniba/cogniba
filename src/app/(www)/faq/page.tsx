import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type QuestionType = {
  question: string;
  answer: string;
};

// TODO
const questions = [
  { question: "Question 1", answer: "Answer to question 1" },
  { question: "Question 2", answer: "Answer to question 2" },
  { question: "Question 3", answer: "Answer to question 3" },
  { question: "Question 4", answer: "Answer to question 4" },
] satisfies QuestionType[];

export default function FAQ() {
  return (
    <div className="h-full w-full px-4 py-12 md:pt-24">
      <Accordion type="multiple" className="mx-auto max-w-3xl">
        {questions.map((question, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{question.question}</AccordionTrigger>
            <AccordionContent>{question.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
