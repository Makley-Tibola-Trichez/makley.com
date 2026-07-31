import { getCollection } from "astro:content";

import { DEFAULT_LOCALE, type Locale } from "@i18n/locales";
import type {
	Education,
	EducationKind,
} from "@domain/education/education.entity";
import { Education as EducationEntity } from "@domain/education/education.entity";
import type { EducationRepository } from "@domain/education/education.repository";
import { toEducation } from "./mappers/education.mapper";
import { mergeEducationTranslation } from "./mappers/education-translation.mapper";

export class EducationContentRepository implements EducationRepository {
	private readonly cache = new Map<Locale, readonly Education[]>();

	async findAll(
		locale: Locale = DEFAULT_LOCALE,
	): Promise<readonly Education[]> {
		const cached = this.cache.get(locale);
		if (cached) return cached;

		const entries = await getCollection("education", ({ data }) => !data.draft);
		const translations = await getCollection(
			"educationTranslations",
			({ id }) => id.endsWith(`.${locale}`),
		);

		const education = entries
			.map((entry) => {
				const override = translations.find(
					(t) => t.id === `${entry.id}.${locale}`,
				);
				const merged = mergeEducationTranslation(entry.data, override?.data);
				return toEducation(entry.id, merged);
			})
			.sort(EducationEntity.compareDesc);

		this.cache.set(locale, education);
		return education;
	}

	async findByKind(kind: EducationKind): Promise<readonly Education[]> {
		return (await this.findAll()).filter((item) => item.kind === kind);
	}
}
