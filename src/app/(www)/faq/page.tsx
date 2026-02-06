import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Strong } from "@/components/ui/Strong";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Scientific answers to your questions about Single N-Back training, IQ improvement, and Cogniba's methodology.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    type: "website",
    url: "/faq",
    title: "Frequently Asked Questions",
    description:
      "Scientific answers to your questions about Single N-Back training, IQ improvement, and Cogniba's methodology.",
    siteName: "Cogniba",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cogniba - Scientific Brain Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions",
    description:
      "Scientific answers to your questions about Single N-Back training, IQ improvement, and Cogniba's methodology.",
    images: ["/og-image.png"],
  },
};

export default function FAQ() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10 md:py-20">
      <h1 className="mb-8 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]">
        Frequently Asked Questions
      </h1>
      <p className="mb-12 text-lg text-muted-foreground">
        Everything you need to know about the science of N-Back, our training
        protocols, and how to get the most out of Cogniba.
      </p>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          The Science of N-Back
        </h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              I&apos;ve heard Dual N-Back is better. Why does Cogniba use Single
              N-Back?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                This is one of the most common misconceptions in brain training.
                While Dual N-Back (tracking audio and visual simultaneously)
                garnered early media attention, subsequent rigorous scientific
                analysis has shown that <Strong>Single N-Back</Strong> is just
                as effective for improving Fluid Intelligence (IQ) and Working
                Memory, while being significantly more sustainable to practice.
              </p>
              <p>
                A landmark study published in the{" "}
                <em className="italic">Journal of Cognitive Psychology</em>{" "}
                compared short-term Single vs. Dual training and found that
                Single N-Back actually outperformed Dual N-Back in transferring
                skills to untrained working memory tasks.
              </p>
              <p>
                The reason? The &quot;active ingredient&quot; in cognitive
                training is <Strong>Updating</Strong>, which is the ability to
                continuously refresh your mental workspace. Single N-Back
                isolates this mechanism perfectly. Dual N-Back often introduces
                &quot;task switching&quot; difficulty that can overwhelm the
                brain without providing a better memory workout. Cogniba focuses
                on Single N-Back to give you the maximum cognitive benefit with
                lower frustration, ensuring you stick with the training long
                enough to see neuroplastic changes.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Does this actually raise IQ?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                The relationship between N-Back training and IQ (Fluid
                Intelligence or Gf) is one of the most exciting and debated
                topics in neuroscience. Fluid Intelligence is the ability to
                solve novel problems without relying on prior knowledge.
                Multiple meta-analyses have found a statistically significant
                improvement in Fluid Intelligence following N-Back training.
              </p>
              <p>
                The mechanism is clear: Fluid Intelligence relies heavily on
                Working Memory Capacity. By expanding this capacity through
                adaptive training, you provide your brain with more
                &quot;RAM&quot; to process complex problems. While results vary
                by individual, the consensus is that{" "}
                <Strong>adaptive training</Strong> (where the difficulty
                increases as you improve) is the key to unlocking these gains.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              What is the &quot;active ingredient&quot; of the training?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                The magic of N-Back isn&apos;t just &quot;remembering.&quot;
                It&apos;s Interference Control and Updating.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Strong>Updating:</Strong> You must constantly discard the old
                  letter/location and encode the new one. This keeps your neural
                  networks flexible.
                </li>
                <li>
                  <Strong>Interference Control:</Strong> You must ignore
                  &quot;lures&quot; (items that match the position n-1 or n+1
                  but not the target n). Resisting the urge to press the button
                  strengthens your Prefrontal Cortex, the CEO of your brain.
                  This specific mechanism is why N-Back helps with focus and
                  impulse control.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Training Protocols & Best Practices
        </h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              How often should I train to see results?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                Neuroplasticity, the physical restructuring of the brain,
                requires consistency and intensity, similar to building muscle
                at the gym. Research suggests the &quot;sweet spot&quot; is{" "}
                <Strong>3 to 5 sessions per week</Strong>, with each session
                lasting 15 to 20 minutes.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Strong>The 20-Session Threshold:</Strong> Significant
                  benefits typically begin to appear after roughly 20 sessions
                  (about 4-5 weeks of training).
                </li>
                <li>
                  <Strong>Rest is Vital:</Strong> Your brain rewires itself
                  during sleep after the training. Training every single day
                  without rest can lead to burnout. We recommend a &quot;3 days
                  on, 1 day off&quot; schedule.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              Should I use strategies like repeating the letters in my head?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                <Strong variant="red">Absolutely not.</Strong> This is the
                &quot;Chunking Trap.&quot; If you use strategies like repeating
                &quot;A, B, C&quot; in a loop (rehearsal) or grouping items
                (chunking), you are shifting the load from your Working Memory
                to your Short-Term Memory or Phonological Loop.
              </p>
              <p>
                While this might get you a higher score in the game, it kills
                the real-world benefits. To get the IQ and Focus gains, you must
                perform the task using <Strong>Intuition</Strong>. It should
                feel like you are just &quot;focusing&quot; and reacting, rather
                than actively memorizing a list. If you find yourself chunking,
                try increasing the speed of the game to break the habit.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              I&apos;m stuck at 3-Back. Have I reached my limit?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                Plateaus are a natural part of the training process. They often
                occur when your brain is consolidating new connections. The jump
                from 2-Back to 3-Back is particularly hard because it exceeds
                the typical &quot;buffer&quot; size for untrained individuals.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Strong>The Dip:</Strong> You might even see your score get
                  worse before it gets better. This is known as &quot;The
                  Dip&quot; and signals that your brain is reorganizing its
                  strategy.
                </li>
                <li>
                  <Strong>Breakthrough:</Strong> To break a plateau, focus on
                  accuracy over speed. Ensure you are getting 90%+ correct
                  before trying to move up. Alternatively, try
                  &quot;overtraining&quot; on the previous level (2-Back) at a
                  higher speed to build processing efficiency.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-left">
              What is the best time of day to train?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                While you can train anytime, research suggests that morning
                training may be optimal for some, as Working Memory performance
                peaks for many people between 8:00 AM and 11:00 AM.
              </p>
              <p>
                However, the most important factor is consistency. If you can
                only stick to a routine by training in the evening, that is far
                better than sporadic morning sessions. Avoid training
                immediately before bed if you find the high cognitive load keeps
                you awake.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">
          Applications for ADHD, Anxiety, and Career
        </h2>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-8">
            <AccordionTrigger className="text-left">
              Can this help with ADHD paralysis and focus?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                Yes. ADHD is fundamentally a challenge of Executive Function.
                Recent studies have shown that adaptive N-Back training can
                significantly improve inhibitory control, which is the ability
                to stop yourself from getting distracted.
              </p>
              <p>
                For &quot;ADHD Paralysis&quot; (the inability to start tasks),
                N-Back helps by expanding your &quot;mental workspace,&quot;
                allowing you to hold the multiple steps of a task in your head
                simultaneously, reducing the feeling of being overwhelmed. Many
                users with ADHD use a short session of N-Back as a
                &quot;warm-up&quot; to activate their brain before tackling
                complex work.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger className="text-left">
              Will this help with my anxiety or intrusive thoughts?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                Emerging research suggests a strong link between Working Memory
                training and anxiety reduction. Anxiety often involves
                &quot;rumination,&quot; defined as the inability to disengage
                from a negative thought.
              </p>
              <p>
                The Single N-Back task trains the <Strong>Disengagement</Strong>{" "}
                mechanism. Every time the target changes, you must let go of the
                old information. This neural pathway (the ability to &quot;let
                go&quot; and &quot;update&quot;) transfers to emotional
                regulation, helping you disengage from intrusive thoughts and
                return to the present moment.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger className="text-left">
              I&apos;m a programmer/writer. How will this help my career?
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-base leading-relaxed">
              <p>
                Knowledge work requires deep focus and the ability to hold
                complex structures (like code architecture or narrative arcs) in
                your head. This is your Working Memory Capacity.
              </p>
              <p>
                By training with Single N-Back, you are effectively upgrading
                your mental RAM. Programmers report being able to
                &quot;see&quot; more of their code logic at once without losing
                their place. Writers report better ability to maintain the
                &quot;thread&quot; of a story while editing. Additionally, the
                Interference Control training helps you ignore open tabs and
                Slack notifications, fostering a state of &quot;Deep Work&quot;.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
