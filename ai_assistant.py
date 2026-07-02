"""
ai_assistant.py

Simple, local helper for generating lesson objectives and suggested activities.
This is a small, dependency-free prototype. It uses rule-based templates and
can be extended to call an external AI service if desired.

Usage:
  python ai_assistant.py "Photosynthesis" --grade=6
"""
import sys
import argparse

TEMPLATE_OBJECTIVE = "Students will be able to {verb} about {topic} at a {level} level."
VERBS = ["explain", "describe", "demonstrate", "compare", "analyze"]

def suggest_objectives(topic, grade=None, count=3):
    level = _grade_to_level(grade)
    objs = []
    for i in range(count):
        verb = VERBS[i % len(VERBS)]
        objs.append(TEMPLATE_OBJECTIVE.format(verb=verb, topic=topic, level=level))
    return objs

def _grade_to_level(grade):
    if grade is None:
        return 'appropriate'
    try:
        g = int(grade)
        if g <= 2:
            return 'beginner'
        if g <=5:
            return 'elementary'
        if g <=8:
            return 'intermediate'
        return 'advanced'
    except Exception:
        return 'appropriate'

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='AI Assistant (rule-based) for lesson planning')
    parser.add_argument('topic', help='Topic or lesson title')
    parser.add_argument('--grade', help='Grade level (number)')
    parser.add_argument('--count', type=int, default=3, help='Number of objectives to generate')
    args = parser.parse_args()

    objectives = suggest_objectives(args.topic, grade=args.grade, count=args.count)
    print('\n'.join(f"- {o}" for o in objectives))
