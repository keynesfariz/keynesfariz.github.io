import { Badge } from '@/components/ui/badge';
import { ResumeSchema } from '@supastuff/json-resume-types';

interface SkillsProps {
  skills: NonNullable<ResumeSchema['skills']>;
}

const MAX_SKILLS = 2;
const MAX_KEYWORDS = 5;

const Skills = ({ skills }: SkillsProps) => (
  <div className="space-y-6">
    {skills.slice(0, MAX_SKILLS).map((skill) => {
      const remainingKeywords = (skill.keywords?.length ?? 0) - MAX_KEYWORDS;
      const remainingKeywordText = remainingKeywords
        ? skill.keywords!.slice(MAX_KEYWORDS).join(', ')
        : undefined;

      return (
        <div key={skill.name} className="space-y-2">
          <h4 className="text-base font-semibold">{skill.name}</h4>
          <div className="flex flex-wrap gap-2">
            {skill.keywords?.slice(0, MAX_KEYWORDS).map((keyword) => (
              <Badge key={keyword} variant="secondary">
                {keyword}
              </Badge>
            ))}
            {remainingKeywords > 0 && (
              <Badge
                variant="outline"
                className="cursor-pointer"
                title={remainingKeywordText}>
                +{remainingKeywords}
              </Badge>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

export default Skills;
