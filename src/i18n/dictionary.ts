import type { Locale } from './locales';
import { commonDictionary, type CommonDictionary } from './dictionaries/common';
import { aboutDictionary, type AboutDictionary } from './dictionaries/about';
import { heroDictionary, type HeroDictionary } from './dictionaries/hero';
import { stackDictionary, type StackDictionary } from './dictionaries/stack';
import { projectsDictionary, type ProjectsDictionary } from './dictionaries/projects';
import {
  projectDetailDictionary,
  type ProjectDetailDictionary,
} from './dictionaries/project-detail';
import { experienceDictionary, type ExperienceDictionary } from './dictionaries/experience';
import { educationDictionary, type EducationDictionary } from './dictionaries/education';
import { resumeDictionary, type ResumeDictionary } from './dictionaries/resume';
import {
  resumePageDictionary,
  type ResumePageDictionary,
} from './dictionaries/resume-page';
import { contactDictionary, type ContactDictionary } from './dictionaries/contact';
import { paletteDictionary, type PaletteDictionary } from './dictionaries/palette';
import { headerDictionary, type HeaderDictionary } from './dictionaries/header';
import { footerDictionary, type FooterDictionary } from './dictionaries/footer';

export interface Dictionary {
  common: CommonDictionary;
  about: AboutDictionary;
  hero: HeroDictionary;
  stack: StackDictionary;
  projects: ProjectsDictionary;
  projectDetail: ProjectDetailDictionary;
  experience: ExperienceDictionary;
  education: EducationDictionary;
  resume: ResumeDictionary;
  resumePage: ResumePageDictionary;
  contact: ContactDictionary;
  palette: PaletteDictionary;
  header: HeaderDictionary;
  footer: FooterDictionary;
}

/**
 * Adding a new section's translations means creating its own dictionary file
 * plus one new line here — existing namespaces stay untouched.
 */
export function getDictionary(locale: Locale): Dictionary {
  return {
    common: commonDictionary[locale],
    about: aboutDictionary[locale],
    hero: heroDictionary[locale],
    stack: stackDictionary[locale],
    projects: projectsDictionary[locale],
    projectDetail: projectDetailDictionary[locale],
    experience: experienceDictionary[locale],
    education: educationDictionary[locale],
    resume: resumeDictionary[locale],
    resumePage: resumePageDictionary[locale],
    contact: contactDictionary[locale],
    palette: paletteDictionary[locale],
    header: headerDictionary[locale],
    footer: footerDictionary[locale],
  };
}
