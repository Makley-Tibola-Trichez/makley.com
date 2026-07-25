import { InvalidValueObjectError } from '../errors';

/** ISO year-month, e.g. `2021-11`. Content authors never write full dates. */
export type YearMonth = `${number}-${number}` | string;

const YEAR_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

/**
 * A professional/academic period, open-ended when the role is current.
 *
 * Owning the formatting here (instead of in each component) means the timeline,
 * the résumé page and the JSON-LD structured data can never disagree about how
 * a period is expressed — a real risk when three templates format dates
 * independently.
 */
export class DateRange {
  private constructor(
    public readonly start: Date,
    public readonly end: Date | null,
  ) {}

  static create(start: YearMonth, end?: YearMonth | null): DateRange {
    const startDate = DateRange.parse(start, 'start');
    const endDate = end ? DateRange.parse(end, 'end') : null;

    if (endDate && endDate < startDate) {
      throw new InvalidValueObjectError(
        'DateRange',
        { start, end },
        'A data final não pode ser anterior à data inicial',
      );
    }

    return new DateRange(startDate, endDate);
  }

  private static parse(value: YearMonth, field: string): Date {
    const match = YEAR_MONTH_PATTERN.exec(value);

    if (!match) {
      throw new InvalidValueObjectError(
        'DateRange',
        value,
        `O campo "${field}" deve seguir o formato AAAA-MM`,
      );
    }

    // UTC avoids the classic off-by-one-month bug in negative-offset timezones.
    return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
  }

  get isCurrent(): boolean {
    return this.end === null;
  }

  /** Total months spanned, inclusive of the starting month. */
  get durationInMonths(): number {
    const until = this.end ?? new Date();
    const years = until.getUTCFullYear() - this.start.getUTCFullYear();
    const months = until.getUTCMonth() - this.start.getUTCMonth();
    return Math.max(1, years * 12 + months + 1);
  }

  /** `2021-11` — the machine-readable form for `<time datetime>` and JSON-LD. */
  get startISO(): string {
    return DateRange.toISOMonth(this.start);
  }

  get endISO(): string | null {
    return this.end ? DateRange.toISOMonth(this.end) : null;
  }

  private static toISOMonth(date: Date): string {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
  }

  /** `nov 2021` */
  private static formatMonth(date: Date, locale: string): string {
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
      .format(date)
      .replace('.', '');
  }

  /** `nov 2021 — out 2025` / `out 2025 — atual` */
  toLabel(locale = 'pt-BR', presentLabel = 'atual'): string {
    const start = DateRange.formatMonth(this.start, locale);
    const end = this.end ? DateRange.formatMonth(this.end, locale) : presentLabel;
    return `${start} — ${end}`;
  }

  /** `3 anos e 11 meses` — rendered next to the period in the timeline. */
  toDurationLabel(): string {
    const total = this.durationInMonths;
    const years = Math.floor(total / 12);
    const months = total % 12;

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);

    return parts.join(' e ') || '1 mês';
  }

  /** Most recent first — the ordering every timeline in the site uses. */
  static compareDesc(a: DateRange, b: DateRange): number {
    if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1;
    return b.start.getTime() - a.start.getTime();
  }
}
