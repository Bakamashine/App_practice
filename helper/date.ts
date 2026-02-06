class DateCustomClass {
  static DefaultParse(date: string): string {
    return new Date(date).toLocaleDateString();
  }
  static GenerateYears({count = 20}: {count: number}): number[] {
    const arr = [];
    const currentYear = new Date().getFullYear()
    for (let i = 0; i<count;i++) {
      arr.push(currentYear-i);
    }
    return arr;
  }
}

export default DateCustomClass