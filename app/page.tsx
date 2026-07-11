import { MapPinIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getHomepageData } from '@/lib/transformers';
import { getResumeSchema } from '@/lib/data';

export default async function Home() {
  const resume = await getResumeSchema();
  const profile = getHomepageData(resume);

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-8 md:flex-row md:items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-left md:text-5xl">
            Hi, I&apos;m Fariz 👋
          </h1>
          <h2 className="text-muted-foreground text-center text-xl font-medium md:text-left md:text-2xl">
            {profile.title}
            {profile.company && (
              <>
                {' @ '}
                <span className="text-foreground font-semibold">
                  {profile.company}
                </span>
              </>
            )}
          </h2>
          <div className="text-muted-foreground flex max-w-2xl flex-col gap-4 leading-relaxed">
            <p>
              I&apos;m a software engineer. I help companies build reliable web
              systems by evaluating technical trade-offs and shipping things
              people actually use 😃.
            </p>
            <p>
              Lately, I&apos;ve been playing around with AI and LLMs, trying to
              see how they can make my daily dev workflow less painful.
            </p>
          </div>
          {profile.location && (
            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
              <MapPinIcon className="size-4" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
        <Avatar className="border-border order-first mx-auto size-40 border-2 md:order-last">
          <AvatarImage
            src={process.env.NEXT_PHOTO_URL}
            alt="Headshot of Fariz"
          />
          <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
            FM
          </AvatarFallback>
        </Avatar>
      </section>

      <Separator />

      {/* Currently I'm Section */}
      <section className="flex flex-col gap-6">
        <h3 className="text-2xl font-bold tracking-tight">
          Currently I&apos;m...
        </h3>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 leading-relaxed">
          <li>
            Building product-focused stuff where shipping fast is the priority,
            but the backend is still solid enough to let me sleep well at night.
          </li>
          <li>
            Tinkering with AI tools because doing repetitive dev tasks manually
            sucks.
          </li>
          <li>
            Stepping away from the screen to make physical stuff. Lately
            it&apos;s been photography, painting, cross-stitching, needle
            felting, and shrinky dinks. Turns out making art with your hands
            actually helps clear the brain for better code architecture.
          </li>
        </ul>
        <div className="mt-4">
          <Link
            href="/about"
            className="text-primary text-sm font-medium underline-offset-4 hover:underline">
            Read more about my journey &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
