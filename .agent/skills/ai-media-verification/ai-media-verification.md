---
name: ai-media-verification
description: Detect whether a photo or video is real, manipulated, AI-generated, or misleading. Use for wartime footage, propaganda, viral videos, suspicious social media posts, deepfakes, reused footage, and emotionally charged content.
---

# AI Media Verification

Use this skill to verify suspicious videos and images before trusting or sharing them.

## Core Rules

- Never trust a single image or video immediately.
- Assume emotionally charged content may be designed to manipulate people.
- Verify before sharing.
- Look for multiple sources, not just one viral post.
- The goal is not to instantly prove something is fake, but to gather evidence.

## Signs of AI-Generated Videos

### Face Problems

Look for:

- Lips not matching speech
- Eyes blinking unnaturally
- Glassy or lifeless eyes
- Teeth changing shape between frames
- Face shape changing slightly during movement
- Distorted ears, hairline, or jawline
- Skin that looks too smooth or unrealistic

### Hand Problems

Look for:

- Extra fingers
- Missing fingers
- Fingers merging together
- Hands changing shape between frames
- Objects passing through hands unnaturally

### Motion Problems

Look for:

- Movement that looks too smooth or floating
- Flickering body edges
- Background shifting unnaturally
- Clothing moving strangely
- Background people acting unnaturally

### Lighting Problems

Look for:

- Shadows pointing in different directions
- Missing reflections in mirrors or windows
- Lighting on the face not matching the environment
- Fire, smoke, water, or explosions looking too perfect

### Audio Problems

Look for:

- Robotic or artificial voice
- Voice and lip movement out of sync
- Accent changing during speech
- Missing breathing sounds
- Emotion not matching facial expression

## Signs of AI-Generated Photos

Look for:

- Extra or missing fingers
- Twisted glasses or jewelry
- Strange teeth or eyes
- Hair blending into the background
- Clothing patterns changing randomly
- Unreadable or misspelled text on signs
- Missing reflections
- Objects merging into each other

### Background Problems

AI mistakes are often hidden in the background:

- Distorted faces in crowds
- Strange wheels or vehicles
- Warped doors or windows
- Floating objects
- Repeating patterns in crowds or buildings

## Reverse Search Process

### For Images

Use:

```bash
Google Lens
Google Reverse Image Search
TinEye
Yandex Image Search
```

Goals:

- Find the original source
- Find older versions of the image
- Check if the image came from another country or event

### For Videos

Use:

```bash
1. Take screenshots from multiple frames
2. Reverse search the screenshots
3. Search key phrases from the caption
4. Check if the video existed before the claimed event
```

## Detecting Reused Footage

Common misinformation tactics:

- Old videos reposted as new events
- Movie scenes shared as real footage
- Video game clips shared as war footage
- Cropped videos hiding important context
- Fake subtitles changing the meaning

## Video Game Footage Detection

Common signs:

- Camera movement too smooth
- Unrealistically cinematic explosions
- Characters move like game characters
- Perfect lighting and graphics
- Missing real-world panic or confusion
- HUD elements cropped out

## Metadata and Forensics

Useful tools:

```bash
ExifTool
Metadata2Go
FotoForensics
InVID
Deepware Scanner
Hive Moderation AI Detector
```

Metadata may reveal:

- Creation date
- Device used
- Editing software
- GPS location

Important:

- Metadata can be removed
- Metadata can be edited
- Missing metadata alone does not prove something is fake

## Trusted Verification Sources

Use trusted investigators and fact-checkers:

- Bellingcat
- Reuters Fact Check
- AFP Fact Check
- BBC Verify
- Snopes
- Alt News

## Verification Workflow

```bash
1. Pause before reacting
2. Identify the original source
3. Look for visual inconsistencies
4. Reverse search the image or video
5. Check metadata if possible
6. Compare with trusted news sources
7. Do not share if uncertain
```

## Key Principle

The most effective propaganda is not always the most realistic.

It only needs to make people emotional enough to share it quickly.

