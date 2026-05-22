export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: "on-building-what-people-need-but-wont-ask-for",
    title: "On building things people need but won't ask for",
    date: "2024-09-14",
    excerpt:
      "The most important infrastructure is the kind people pretend doesn't exist until it does. This is not a bug in how we fund and prioritize work. It is a feature of how control operates.",
    readTime: "5 min",
    tags: ["infrastructure", "systems", "philosophy"],
    content: `
The most important infrastructure is the kind people pretend doesn't exist until it does.

I have built systems that moved data through networks that were actively trying to stop it. I have built credential managers for teams that didn't know they needed one until the incident. I have built logging systems that nobody asked for, that everyone was grateful for when something went wrong at 3am.

None of these things were requested. All of them were necessary.

This is the thing about working at the intersection of infrastructure and security: you are often building solutions to problems people haven't recognized yet. The recognition comes later — usually at the worst possible moment.

There is a particular kind of arrogance required to build things nobody asked for. You have to believe, against available evidence, that you understand the need better than the people who have it. Sometimes you are wrong. But when you are right, the system runs quietly in the background, doing exactly what it should, and no one knows you built it.

That is the job.

The alternative — waiting to be asked, building only what is requested, staying within the scope of what is understood — is safer. It is also, I think, a failure of nerve.

The most important thing I have built is not on my portfolio. It runs on servers in places I cannot name, for people who needed to get out of networks that were watching them. Nobody asked me to build it. I built it because it needed to exist.

That is the only reason to build anything.
    `.trim(),
  },
  {
    slug: "why-go-is-not-a-language-choice",
    title: "Why Go is not a language choice. It's a statement.",
    date: "2024-01-22",
    excerpt:
      "Simple isn't the same as easy. Explicit isn't the same as verbose. Choosing Go is choosing to be accountable for what your code does.",
    readTime: "4 min",
    tags: ["go", "engineering", "philosophy"],
    content: `
Simple isn't the same as easy. Explicit isn't the same as verbose.

I write Go because it makes me accountable.

In Go, there is no magic. No metaprogramming that hides what is happening. No frameworks that do too much. No implicit conversions, no operator overloading, no inherited behavior you didn't ask for.

What you write is what runs. If it's broken, it's clearly broken. If it's slow, you can see why. If it handles errors incorrectly, the type system won't save you — you have to mean what you write.

This is uncomfortable. It is supposed to be.

I have heard the arguments against Go. The error handling is verbose. The generics came too late. It lacks the expressiveness of Rust, the elegance of OCaml, the power of Zig. These are fair criticisms. I do not disagree with them.

But I write infrastructure for systems that cannot fail quietly. The thing I value most in that context is not expressiveness — it is legibility. Not for me now, but for me at 3am six months from now, reading code I wrote when I understood the problem differently.

Go forces legibility. It forces explicit error handling. It forces you to say, clearly, what happens when things go wrong.

That is not a limitation. That is the entire point.

I choose Go the same way I choose to write clear documentation: because it is a statement about what I believe matters. Cleverness is temporary. Clarity compounds.
    `.trim(),
  },
  {
    slug: "control-is-always-about-information-first",
    title: "Control is always about information first",
    date: "2023-11-08",
    excerpt:
      "Every system of control — governmental, corporate, interpersonal — begins with controlling what people know. Build accordingly.",
    readTime: "6 min",
    tags: ["security", "freedom", "systems"],
    content: `
Every system of control — governmental, corporate, interpersonal — begins with controlling what people know.

This is not a conspiracy theory. It is infrastructure.

Censorship is not primarily about blocking content. It is about making certain kinds of communication expensive enough that people stop attempting them. The Great Firewall does not catch everything. It doesn't need to. It catches enough that most people don't try.

The DPI inspection, the keyword filtering, the IP blocks — these are the visible layer. The invisible layer is the chilling effect: the knowledge that you are being watched, which changes what you say before it changes what you can say.

This is what I mean when I say control is about information. Not just the information being controlled, but the information that control is happening at all.

The most effective censorship is the kind where people self-censor because they have internalized the surveillance. You don't need to block the message. You need to make the messenger uncertain about the cost of sending it.

Building anti-censorship tools is not just about protocols. It is about restoring the confidence that communication is possible. That a message sent will arrive. That the infrastructure of speech is trustworthy.

This is harder than it sounds. Trust is not a feature you can add with a flag. It is a property that emerges from everything the system does, including the things that happen when it fails.

The tools I have built try to address this. Not just technically — providing reliable transport through hostile networks — but in terms of the experience: making the act of communication feel safe enough that people will actually use it.

Infrastructure for freedom is not finished when it technically works. It is finished when the person who needs it trusts it enough to depend on it.

That is a different engineering problem than most.
    `.trim(),
  },
  {
    slug: "the-weight-of-what-you-build",
    title: "The weight of what you build",
    date: "2023-08-03",
    excerpt:
      "There is a version of professionalism that's really just a failure of nerve. This is about the other kind.",
    readTime: "3 min",
    tags: ["philosophy", "responsibility"],
    content: `
There is a version of professionalism that's really just a failure of nerve.

It looks like: building exactly what was scoped, nothing more. Flagging concerns in tickets that will not be read. Delivering on time to specifications that were wrong from the beginning. Never pushing back on what is being built. Never asking why.

This version of professionalism is very safe. It is also very comfortable. And it produces systems that, when they cause harm, can point to a long paper trail demonstrating that everyone followed the process.

The process was the problem. Nobody wanted to say so.

I have a different definition. Professional means: accountable for consequences, not just deliverables. It means understanding what the thing you're building will do in the world — not just in the spec — and being willing to say when that thing should not be built at all.

This is uncomfortable. It requires having opinions, defending them, and sometimes losing. It requires caring about outcomes when it would be much easier to care only about outputs.

I build infrastructure that matters to me. Not because that is commercially optimal. Because I cannot not care what I build.

The weight of what you build is the weight you carry when you go to sleep. You can distribute that weight through process, through scope documents, through "it's not my call." Or you can carry it.

I choose to carry it. It is heavier. It is the only way I know how to work.
    `.trim(),
  },
];
