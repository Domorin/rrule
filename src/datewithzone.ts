import { dateInTimeZone, timeToUntilString } from './dateutil'

export class DateWithZone {
  public date: Date
  public tzid?: string | null

  constructor(date: Date, tzid?: string | null) {
    if (isNaN(date.getTime())) {
      throw new RangeError('Invalid date passed to DateWithZone')
    }
    this.date = date
    this.tzid = tzid
  }

  private get isUTC() {
    return !this.tzid || this.tzid.toUpperCase() === 'UTC'
  }

  public toString() {
    const datestr = timeToUntilString(this.date.getTime(), this.isUTC)
    if (!this.isUTC) {
      return `;TZID=${this.tzid}:${datestr}`
    }

    return `:${datestr}`
  }

  public getTime() {
    return this.date.getTime()
  }

  public rezonedDate() {
    console.log('rezonedDate: before', this.date.toISOString())
    if (this.isUTC) {
      return this.date
    }

    console.log(
      'rezonedDate: after',
      dateInTimeZone(this.date, this.tzid).toISOString()
    )

    return dateInTimeZone(this.date, this.tzid)
  }
}
